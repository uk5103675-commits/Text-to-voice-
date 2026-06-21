import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type, Modality } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" }));

// Initialize Google GenAI client if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
  console.log("Google GenAI client initialized successfully with GEMINI_API_KEY.");
} else {
  console.warn("WARNING: GEMINI_API_KEY is not defined in the environment. AI-powered features will fall back to simulated modes or present setup suggestions.");
}

// Helper to convert Raw mono 16-bit PCM little-endian 24kHz audio to standard WAV format
function pcmToWav(pcmBuffer: Buffer, sampleRate: number = 24000): Buffer {
  const numOfChan = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numOfChan * bitsPerSample) / 8;
  const blockAlign = (numOfChan * bitsPerSample) / 8;
  const wavHeader = Buffer.alloc(44);

  // RIFF identifier
  wavHeader.write("RIFF", 0);
  // File length minus RIFF identifier length and file description length
  wavHeader.writeUInt32LE(36 + pcmBuffer.length, 4);
  // RIFF type
  wavHeader.write("WAVE", 8);
  // Format chunk identifier
  wavHeader.write("fmt ", 12);
  // Format chunk length (16 for PCM)
  wavHeader.writeUInt32LE(16, 16);
  // Sample format (1 = raw PCM)
  wavHeader.writeUInt16LE(1, 20);
  // Channel count (1 = mono)
  wavHeader.writeUInt16LE(numOfChan, 22);
  // Sample rate
  wavHeader.writeUInt32LE(sampleRate, 24);
  // Byte rate
  wavHeader.writeUInt32LE(byteRate, 28);
  // Block align
  wavHeader.writeUInt16LE(blockAlign, 32);
  // Bits per sample
  wavHeader.writeUInt16LE(bitsPerSample, 34);
  // Data chunk identifier
  wavHeader.write("data", 36);
  // Data chunk length
  wavHeader.writeUInt32LE(pcmBuffer.length, 40);

  return Buffer.concat([wavHeader, pcmBuffer]);
}

// API Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    hasApiKey: !!apiKey,
    timestamp: new Date().toISOString(),
  });
});

// Text Analysis Endpoint (using gemini-3.5-flash)
app.post("/api/tts/analyze", async (req: Request, res: Response) => {
  const { text } = req.body;

  if (!text || typeof text !== "string" || text.trim() === "") {
    res.status(400).json({ error: "Text field is required and must be a valid string." });
    return;
  }

  // Fallback metadata if Gemini API is missing
  if (!ai) {
    // Basic local language and tone analysis fallback to remain functional
    const lowercase = text.toLowerCase();
    let detectedLanguage = "English";
    let category = "General";
    let suggestedEmotion = "Neutral";
    let reason = "Fallback analyzer activated because GEMINI_API_KEY is not configured yet.";

    if (/[\u0600-\u06FF]/.test(text)) {
      detectedLanguage = "Urdu";
      category = "General / Urdu passage";
      suggestedEmotion = "Inspirational";
    } else if (/[\u0900-\u097F]/.test(text)) {
      detectedLanguage = "Hindi";
      category = "General / Hindi passage";
      suggestedEmotion = "Storytelling";
    }

    res.json({
      detectedLanguage,
      category,
      suggestedEmotion,
      reason,
      confidence: 1.0,
      isFallback: true,
    });
    return;
  }

  try {
    const prompt = `You are the backend metadata analyzer for Just2Voice, the ultimate text-to-speech platform.
Analyze the following text and determine:
1. The primary language of the text. (Choose from: Urdu, Hindi, English, Pashto, Hindko, Arabic, Punjabi, Turkish, Persian, Bengali, Chinese, French, German, Spanish, or specify other).
2. The style/content category of the text. (Choose from: Storytelling, Documentary, Islamic Content, News, Motivation, Educational, Conversation, General).
3. The best match emotion for reading this text. (Choose from: Neutral, Happy, Sad, Inspirational, Serious, Documentary, News, Islamic, Storytelling).
4. A short human-friendly explanation of why this was selected.

Output strictly a JSON object matching this schema:
{
  "detectedLanguage": "detected language name here",
  "category": "detected category name here",
  "suggestedEmotion": "suggested emotion here",
  "reason": "short elegant reason why",
  "confidence": 0.95
}

Do not include any Markdown blocks, comments, or backticks around the raw JSON output.

Text to analyze:
"${text.replace(/"/g, '\\"')}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            detectedLanguage: { type: Type.STRING },
            category: { type: Type.STRING },
            suggestedEmotion: { type: Type.STRING },
            reason: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
          },
          required: ["detectedLanguage", "category", "suggestedEmotion", "reason", "confidence"],
        },
      },
    });

    const resultText = response.text?.trim() || "{}";
    const resultObj = JSON.parse(resultText);

    res.json(resultObj);
  } catch (err: any) {
    console.error("Error analyzing text:", err);
    res.status(500).json({
      error: "Failed to analyze text metadata.",
      details: err.message,
    });
  }
});

// TTS Speech Generation Endpoint (using gemini-3.1-flash-tts-preview)
app.post("/api/tts/generate", async (req: Request, res: Response) => {
  const {
    text,
    voiceName = "Kore",
    speed = 1.0,
    pitch = 0,
    emotion = "Neutral",
    pauseStrength = "Normal",
    pronunciationEnhancement = true,
    language = "English",
  } = req.body;

  if (!text || typeof text !== "string" || text.trim() === "") {
    res.status(400).json({ error: "Text field is required." });
    return;
  }

  if (!ai) {
    res.status(500).json({
      error: "Gemini API key is not configured. Please add GEMINI_API_KEY to your Secrets panel or .env file to generate true AI voice.",
    });
    return;
  }

  try {
    // Construct a rich, descriptive speak prompt to direct the emotional model
    // This allows us to influence speed, emotion, pause, and language pronunciation
    let promptInstructions = "";

    // Emotion directions
    if (emotion !== "Neutral") {
      promptInstructions += ` Read with a highly ${emotion.toLowerCase()} feeling and proper expressive tone.`;
    }

    // Speed directions
    if (speed < 0.8) {
      promptInstructions += " Speak slowly, carefully and deliberately.";
    } else if (speed > 1.25) {
      promptInstructions += " Speak with a rapid, energetic pace.";
    } else {
      promptInstructions += " Speak at a natural, balanced tempo.";
    }

    // Pacing and Pause strength direction
    if (pauseStrength === "Brief") {
      promptInstructions += " Use minimal, short pauses between sentences.";
    } else if (pauseStrength === "Long") {
      promptInstructions += " Incorporate long, dramatic, and respectful pauses at appropriate intervals.";
    } else {
      promptInstructions += " Maintain standard human pausing patterns.";
    }

    // Language guidelines
    if (language.toLowerCase() === "urdu") {
      promptInstructions += " IMPORTANT: Speak with high fidelity standard Pakistani Urdu accent and exact pronunciation. Do not use an English accent.";
    } else if (language.toLowerCase() === "hindi") {
      promptInstructions += " IMPORTANT: Speak with premium standard Indian Hindi accent, smooth delivery, and clean Hindi pronunciation.";
    } else if (language.toLowerCase() === "pashto") {
      promptInstructions += " IMPORTANT: Speak with authentic Pashto pronunciation and native Pashtun cadence.";
    } else if (language.toLowerCase() === "hindko") {
      promptInstructions += " IMPORTANT: Speak in a natural Hindko dialect with traditional inflection.";
    } else if (language.toLowerCase() === "punjabi") {
      promptInstructions += " IMPORTANT: Speak in a warm, lively Punjabi accent and proper local pronunciation.";
    } else if (language.toLowerCase() === "arabic") {
      promptInstructions += " IMPORTANT: Use clear Arabic classical (Fusha) pronunciation, respects standard pauses and tajweed-like respect.";
    }

    if (pronunciationEnhancement) {
      promptInstructions += " Ensure high articulation, absolute studio quality speech synthesis, and correct syllable stresses.";
    }

    const ttsPrompt = `[Voice Director Directives:${promptInstructions.trim()}]\n\nSpeak the following content cleanly:\n"${text.replace(/"/g, '\\"')}"`;

    console.log(`Sending TTS generation request with voice [${voiceName}] for prompt:`, ttsPrompt);

    // Call the gemini-3.1-flash-tts-preview model to get audio
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: ttsPrompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName as any },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      throw new Error("No audio payload returned from Gemini TTS model.");
    }

    // Convert raw PCM bytes to WAV
    const pcmBuffer = Buffer.from(base64Audio, "base64");
    const wavBuffer = pcmToWav(pcmBuffer, 24000); // 24kHz Mono 16-bit PCM

    const wavBase64 = wavBuffer.toString("base64");
    const dataUrl = `data:audio/wav;base64,${wavBase64}`;

    res.json({
      audioUrl: dataUrl,
      settings: {
        voiceName,
        speed,
        pitch,
        emotion,
        pauseStrength,
        pronunciationEnhancement,
        language,
      },
    });
  } catch (err: any) {
    console.error("Error generating voice:", err);
    res.status(500).json({
      error: "Voice generation failed.",
      details: err.message,
    });
  }
});

// Configure Vite middleware in development or static server in production
async function configureServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Mounted Vite development middleware.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving production static assets from:", distPath);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Just2Voice server initialized and listening at http://0.0.0.0:${PORT}`);
  });
}

configureServer().catch((error) => {
  console.error("Initialization of full-stack server failed:", error);
});
