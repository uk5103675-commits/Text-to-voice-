import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Layers, 
  Sun, 
  Moon, 
  Copy, 
  Trash2, 
  Save, 
  Languages, 
  Activity, 
  Check, 
  Cpu,
  CornerDownRight,
  Info,
  CheckCircle,
  Play,
  Heart,
  ExternalLink
} from 'lucide-react';

import { VoicePreset, TtsSettings, AnalysisResponse, HistoryItem } from './types';
import { voicePresets, supportedLanguagesList } from './data/voices';
import VoiceControlsPanel from './components/VoiceControlsPanel';
import RecommendPanel from './components/RecommendPanel';
import AudioPlayerSection from './components/AudioPlayerSection';
import HistorySection from './components/HistorySection';

export default function App() {
  // Theme settings
  const [isDark, setIsDark] = useState(true);

  // Editor states
  const [text, setText] = useState(
    'السلام علیکم! جسٹ ٹو وائس میں خوش آمدید۔ یہاں آپ کسی بھی زبان میں لکھ کر نہایت قدرتی اور جاندار آوازیں سیکنڈز میں حاصل کر سکتے ہیں۔'
  );
  const [draftSaved, setDraftSaved] = useState(false);

  // Active Voice Selection
  const [selectedVoice, setSelectedVoice] = useState<VoicePreset>(
    voicePresets.find(v => v.id === 'urdu-doc-male') || voicePresets[0]
  );

  // Voice controls state
  const [settings, setSettings] = useState<TtsSettings>({
    speed: 1.0,
    pitch: 0,
    volume: 100,
    emotion: 'Neutral',
    pauseStrength: 'Normal',
    pronunciationEnhancement: true
  });

  // Flow State management
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [animationStep, setAnimationStep] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null);

  // Slide Recommendations Drawer
  const [isRecommendPanelOpen, setIsRecommendPanelOpen] = useState(false);

  // Favorites matches
  const [favorites, setFavorites] = useState<string[]>([]);

  // Generation log history
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Preview elements
  const [previewPlayingVoiceId, setPreviewPlayingVoiceId] = useState<string | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);
  
  // Quick play history element
  const [playingHistoryId, setPlayingHistoryId] = useState<string | null>(null);
  const historyAudioRef = useRef<HTMLAudioElement | null>(null);

  // Load favorites & history from localStorage on mount
  useEffect(() => {
    const savedFavs = localStorage.getItem('just2voice_favs');
    if (savedFavs) {
      setFavorites(JSON.parse(savedFavs));
    }

    const savedHistory = localStorage.getItem('just2voice_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    const savedDraft = localStorage.getItem('just2voice_draft');
    if (savedDraft) {
      setText(savedDraft);
    }
  }, []);

  // Sync draft auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('just2voice_draft', text);
      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 2000);
    }, 1500);

    return () => clearTimeout(timer);
  }, [text]);

  const toggleFavorite = (voiceId: string) => {
    const updated = favorites.includes(voiceId)
      ? favorites.filter(id => id !== voiceId)
      : [...favorites, voiceId];
    setFavorites(updated);
    localStorage.setItem('just2voice_favs', JSON.stringify(updated));
  };

  // Word and character calculation
  const charCount = text.length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    // Temporary alert/state can be shown elegantly
  };

  const handleClearText = () => {
    setText('');
  };

  // Quick Language Presets
  const applyLanguageSample = (lang: string) => {
    switch (lang) {
      case 'Urdu':
        setText('رنگ برنگے پھولوں سے بھرا یہ گلشن کس قدر خوبصورت اور دلکش دکھائی دیتا ہے۔ چڑیوں کی چہچہاہٹ فضا میں رس گھولتی ہے۔');
        const urduVoice = voicePresets.find(v => v.language.includes('Urdu')) || selectedVoice;
        setSelectedVoice(urduVoice);
        break;
      case 'Hindi':
        setText('सफलता का कोई जादुई मंत्र नहीं होता, यह केवल कठिन परिश्रम, दृढ़ संकल्प और खुद पर विश्वास करने से ही हासिल होती है।');
        const hindiVoice = voicePresets.find(v => v.language.includes('Hindi')) || selectedVoice;
        setSelectedVoice(hindiVoice);
        break;
      case 'English US':
        setText('Success isn\'t given, it\'s earned. Rise up today and claim what is yours with unwavering dedication.');
        const engUsVoice = voicePresets.find(v => v.language === 'English (US)') || selectedVoice;
        setSelectedVoice(engUsVoice);
        break;
      case 'English UK':
        setText('In the deep cosmic embrace of space, countless celestial bodies swirl in an infinite ballet of precision.');
        const engUkVoice = voicePresets.find(v => v.language === 'English (UK)') || selectedVoice;
        setSelectedVoice(engUkVoice);
        break;
      case 'Hindko':
        setText('جی آیاں نوں۔ ہندکو مینڈھے وسیب دی بڑی مٹھی زبان اے، ساڈے پیار دی سنگت ہمیشہ سلامت رووے۔');
        const hindkoVoice = voicePresets.find(v => v.language.includes('Hindko')) || selectedVoice;
        setSelectedVoice(hindkoVoice);
        break;
      case 'Pashto PK':
        setText('پښتو ژبه زموږ د غیرت او بریا نښه ده، راځئ چې په پوره محبت سره یې کلمات د ټولې نړۍ غوږونو ته ورسوو۔');
        const pashtoPkVoice = voicePresets.find(v => v.language === 'Pashto (Pakistan)') || selectedVoice;
        setSelectedVoice(pashtoPkVoice);
        break;
      case 'Pashto Afg':
        setText('وطندارانو السلام علیکم۔ د افغانستان خوږه او لرغونې پښتو غږیز کلام د زړونو تر مینځ اړیکې ٹینګوي۔');
        const pashtoAfgVoice = voicePresets.find(v => v.language === 'Pashto (Afghanistan)') || selectedVoice;
        setSelectedVoice(pashtoAfgVoice);
        break;
      case 'Saraiki':
        setText('ماہی بےپرواہ نال پیار کیتوسے ول ہر ویلے دڑ دھاوے ملسن۔ ساڈی سرائیکی آواز دی مٹھاس محسوس کرو۔');
        const saraikiVoice = voicePresets.find(v => v.language.includes('Saraiki')) || selectedVoice;
        setSelectedVoice(saraikiVoice);
        break;
      case 'Punjabi':
        setText('ਜੀ ਆਇਆਂ ਨੂੰ ਜੀ! ਸਾਡੀ ਬੋਲੀ ਪੰਜਾਬੀ ਦੀ ਮਿਠਾਸ ਤੇ ਖੁਸ਼ਦਿਲੀ ਪੂਰੀ ਦੁਨੀਆ ਵਿੱਚ ਆਪਣੀ ਵੱਖਰੀ ਪਛਾਣ ਰੱਖਦੀ ਹੈ।');
        const punjabiVoice = voicePresets.find(v => v.language.includes('Punjabi')) || selectedVoice;
        setSelectedVoice(punjabiVoice);
        break;
      case 'Turkish':
        setText('Başarı bir yolculuktur, bir varış noktası değil. Bugün hayallerinize doğru cesur bir adım atın.');
        const turkishVoice = voicePresets.find(v => v.language.includes('Turkish')) || selectedVoice;
        setSelectedVoice(turkishVoice);
        break;
      case 'Chinese':
        setText('用声音传递真诚的力量，开启智能语音时代的新篇章，让科技充满人性的温度。');
        const chineseVoice = voicePresets.find(v => v.language.includes('Chinese')) || selectedVoice;
        setSelectedVoice(chineseVoice);
        break;
      case 'Arabic':
        setText('المعرفة كنز عظيم لا يقل أبداً، بل يزداد بالبحث والتعلم والقراءة المستمرة في شتى مجالات المعرفة.');
        const arabVoice = voicePresets.find(v => v.language.includes('Arabic')) || selectedVoice;
        setSelectedVoice(arabVoice);
        break;
      case 'Persian':
        setText('درود بر روان پاک شما. زبان شیرین پارسی، زبان شعر و سخن و عشق ورزی به زیبایی‌های هستی است.');
        const persianVoice = voicePresets.find(v => v.language.includes('Persian')) || selectedVoice;
        setSelectedVoice(persianVoice);
        break;
      default:
        break;
    }
  };

  // Trigger Language and Text Analysis
  const handleGenerateVoice = async () => {
    if (text.trim() === '') return;

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // Step-by-step loading process animations
      setAnimationStep('Analyzing Text...');
      await new Promise(resolve => setTimeout(resolve, 900));

      setAnimationStep('Detecting Language...');
      
      const response = await fetch('/api/tts/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Analysis API failed');
      }

      const result: AnalysisResponse = await response.json();
      
      setAnimationStep('Selecting Best Voice...');
      await new Promise(resolve => setTimeout(resolve, 800));

      setAnalysisResult(result);
      
      // Auto-update emotion if gemini suggested one that is supported
      if (result.suggestedEmotion) {
        setSettings(prev => ({
          ...prev,
          emotion: result.suggestedEmotion
        }));
      }

      // Find best voice match in database matching the detected language
      const detectedLower = result.detectedLanguage.toLowerCase();
      const matchedVoice = voicePresets.find(v => 
        v.language.toLowerCase().includes(detectedLower) || 
        detectedLower.includes(v.language.toLowerCase())
      );

      if (matchedVoice) {
        setSelectedVoice(matchedVoice);
      }

      setIsAnalyzing(false);
      setAnimationStep('');
      
      // Open Smart Voice Recommendation drawer
      setIsRecommendPanelOpen(true);

    } catch (err) {
      console.error(err);
      setIsAnalyzing(false);
      setAnimationStep('');
      // Fallback open panel anyway so they can proceed
      setIsRecommendPanelOpen(true);
    }
  };

  // Synthesize Studio Quality Audio directly!
  const handleSynthesizeAudio = async () => {
    if (text.trim() === '') return;
    setIsSynthesizing(true);
    setDraftSaved(false);

    try {
      setAnimationStep('Generating Studio Quality Audio...');
      
      const payload = {
        text,
        voiceName: selectedVoice.prebuiltVoiceName,
        speed: settings.speed,
        pitch: settings.pitch,
        emotion: settings.emotion,
        pauseStrength: settings.pauseStrength,
        pronunciationEnhancement: settings.pronunciationEnhancement,
        language: selectedVoice.language
      };

      const response = await fetch('/api/tts/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Speech synthesis failed.');
      }

      const data = await response.json();
      setGeneratedAudioUrl(data.audioUrl);

      // Close recommended panel so they see the audio player clearly
      setIsRecommendPanelOpen(false);

      // Save to History List
      const newItem: HistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        text: text.substring(0, 150) + (text.length > 150 ? '...' : ''),
        voiceName: selectedVoice.name,
        voiceId: selectedVoice.id,
        language: selectedVoice.language,
        category: analysisResult?.category || 'General Narration',
        emotion: settings.emotion,
        audioUrl: data.audioUrl,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        settings: { ...settings }
      };

      const updatedHistory = [newItem, ...history];
      setHistory(updatedHistory);
      localStorage.setItem('just2voice_history', JSON.stringify(updatedHistory));

    } catch (err: any) {
      console.error("Synthesize failed:", err);
      // Give fallback warning or details
      alert(err.message || "Synthesis error. Check your GEMINI_API_KEY setting.");
    } finally {
      setIsSynthesizing(false);
      setAnimationStep('');
    }
  };

  // Play auditory text preview of specific voices on recommendation list
  const handlePreviewVoice = async (voice: VoicePreset) => {
    if (previewPlayingVoiceId === voice.id) {
      // Toggle off
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
      }
      setPreviewPlayingVoiceId(null);
      return;
    }

    setPreviewPlayingVoiceId(voice.id);

    try {
      const payload = {
        text: voice.previewText,
        voiceName: voice.prebuiltVoiceName,
        speed: 1.0,
        pitch: 0,
        emotion: 'Neutral',
        pauseStrength: 'Normal',
        pronunciationEnhancement: true,
        language: voice.language
      };

      const response = await fetch('/api/tts/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Preview generation failed");

      const data = await response.json();
      
      // Stop other preview if active
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
      }

      const audio = new Audio(data.audioUrl);
      previewAudioRef.current = audio;
      
      audio.play();
      audio.onended = () => {
        setPreviewPlayingVoiceId(null);
      };

    } catch (err) {
      console.error("Vocal audition error:", err);
      setPreviewPlayingVoiceId(null);
    }
  };

  // Play generation history audio segment
  const handlePlayHistoryItem = (item: HistoryItem) => {
    if (playingHistoryId === item.id) {
      if (historyAudioRef.current) {
        historyAudioRef.current.pause();
      }
      setPlayingHistoryId(null);
      return;
    }

    setPlayingHistoryId(item.id);

    if (historyAudioRef.current) {
      historyAudioRef.current.pause();
    }

    const audio = new Audio(item.audioUrl);
    historyAudioRef.current = audio;
    audio.play().catch(e => console.error("History playback failed:", e));
    
    audio.onended = () => {
      setPlayingHistoryId(null);
    };
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    localStorage.setItem('just2voice_history', JSON.stringify(updated));
  };

  const handleClearAllHistory = () => {
    setHistory([]);
    localStorage.removeItem('just2voice_history');
  };

  const handleRestoreText = (originalText: string) => {
    setText(originalText);
    // Smooth scroll back to textarea editor
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen font-sans transition-all duration-300 leading-normal ${
      isDark 
        ? 'bg-slate-950 text-slate-100 bg-radial-gradient from-slate-900 to-slate-950' 
        : 'bg-slate-50 text-slate-850'
    }`}>
      {/* Upper header navigation bar */}
      <header className={`p-4 sticky top-0 z-30 border-b backdrop-blur-md transition-all ${
        isDark 
          ? 'bg-slate-950/80 border-slate-900 text-slate-100' 
          : 'bg-white/80 border-slate-200 text-slate-900'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
              <span className="font-display font-black text-xl italic tracking-tighter">J2</span>
            </div>
            <div>
              <span className="font-display font-extrabold text-xl tracking-tight gradient-text">Just2Voice</span>
              <span className="hidden sm:inline-block ml-1.5 text-[9px] font-bold bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">ElevenLabs Clone AI</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:flex items-center gap-1.5 text-xs text-slate-450 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-505 bg-emerald-500 animate-ping" />
              Gemini TTS Engine Active
            </span>

            {/* Dark & light modes switcher */}
            <button
              id="theme-toggler"
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-xl cursor-pointer transition-all ${
                isDark 
                  ? 'bg-slate-900 text-amber-400 hover:bg-slate-800' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Area */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        {/* Banner introduction card */}
        <section className={`p-6 rounded-3xl border text-left relative overflow-hidden transition-all ${
          isDark 
            ? 'bg-gradient-to-b from-slate-900/40 to-slate-950/20 border-slate-850' 
            : 'bg-gradient-to-b from-white to-slate-50 border-slate-220/80 shadow-sm'
        }`}>
          {/* Neon lights style decorative elements */}
          <div className="absolute right-0 top-0 w-80 h-40 bg-indigo-500/5 blur-[80px] pointer-events-none rounded-full" />
          <div className="absolute left-1/3 bottom-0 w-60 h-20 bg-purple-500/5 blur-[80px] pointer-events-none rounded-full" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 font-mono tracking-wider uppercase">
                <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" /> Next-Gen AI Accent Engine
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold font-display leading-[1.15] tracking-tight">
                Instantly Generate Stunning, Human-Like Speech
              </h1>
              <p className="text-sm text-slate-500 max-w-xl leading-normal">
                Type in Urdu, Hindi, English, Pashto, Hindko, Punjabi, Arabic or more. Our system auto-detects language and content tone to assign perfect native speech cadence with emotions.
              </p>
            </div>

            {/* Favorites circle count indicator */}
            <div className="flex flex-col gap-2 items-start md:items-end shrink-0 max-w-full md:max-w-md">
              <span className="text-xs text-slate-500 font-semibold mb-1">Quick Presets:</span>
              <div className="flex flex-wrap gap-1.5 justify-start md:justify-end max-h-24 overflow-y-auto pr-1">
                {['Urdu', 'Hindi', 'English US', 'English UK', 'Hindko', 'Pashto PK', 'Pashto Afg', 'Saraiki', 'Punjabi', 'Turkish', 'Chinese', 'Arabic', 'Persian'].map((ln) => (
                  <button
                    key={ln}
                    id={`sample-preset-${ln.toLowerCase().replace(' ', '-')}`}
                    onClick={() => applyLanguageSample(ln)}
                    className={`py-1 px-2 text-[11px] font-semibold rounded-lg cursor-pointer transition-all ${
                      isDark 
                        ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700 hover:text-white' 
                        : 'bg-white border border-slate-205 text-slate-650 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900'
                    }`}
                  >
                    {ln}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Grid Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LHS Panel: Text Editor Input & Voice recommendation entry trigger (8 cols) */}
          <section className="lg:col-span-7 xl:col-span-8 space-y-6">
            <div className={`p-5 rounded-3xl border transition-all duration-300 ${
              isDark 
                ? 'bg-slate-900/30 border-slate-850/80' 
                : 'bg-white border-slate-220/80 shadow-md'
            }`}>
              
              {/* Textarea Header Bar */}
              <div className="flex items-center justify-between border-b pb-3 mb-4 border-slate-800/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-450 font-mono">
                    Paste / Type Multi-Lingual Text
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono select-none px-2 py-0.5 rounded ${
                    draftSaved 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : 'text-slate-500'
                  }`}>
                    {draftSaved ? 'Draft Auto-Saved' : 'Listening...'}
                  </span>
                  
                  {text.length > 0 && (
                    <button
                      id="clear-text-btn"
                      onClick={handleClearText}
                      title="Clear textarea"
                      className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                        isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-rose-400' : 'hover:bg-slate-150 text-slate-500 hover:text-rose-600'
                      }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Text Input area */}
              <div className="relative">
                <textarea
                  id="main-voice-textarea"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste or type your text here in Urdu, Hindi, English, Pashto, Hindko, Arabic, Punjabi, or any supported language..."
                  className={`w-full min-h-64 md:min-h-80 p-4 rounded-2xl outline-none font-sans text-sm md:text-base leading-relaxed tracking-normal resize-y transition-all ${
                    isDark 
                      ? 'bg-slate-950/60 border border-slate-850 text-slate-100 focus:border-indigo-500' 
                      : 'bg-slate-50 border border-slate-200 text-slate-850 focus:border-indigo-500 focus:bg-white'
                  }`}
                />
              </div>

              {/* Counters & Clipboard Shortcuts */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-3 pt-3 border-t border-dashed border-slate-800/10">
                <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                  <span>Characters: <b className="text-indigo-400">{charCount}</b></span>
                  <span className="text-slate-800">/</span>
                  <span>Words: <b className="text-purple-400">{wordCount}</b></span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="copy-text-btn"
                    onClick={handleCopyText}
                    className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 border cursor-pointer transition-all ${
                      isDark 
                        ? 'bg-slate-950 border-slate-850 text-slate-300 hover:bg-slate-900' 
                        : 'bg-white border-slate-205 text-slate-650 hover:bg-slate-100'
                    }`}
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy Text
                  </button>
                  
                  {/* Select active voice indicator banner */}
                  {selectedVoice && (
                    <div className={`py-1.5 px-3 rounded-lg border flex items-center gap-1.5 text-xs font-mono font-semibold ${
                      isDark ? 'bg-indigo-950/20 border-indigo-500/15 text-indigo-400' : 'bg-indigo-50 border-indigo-500/10 text-indigo-700'
                    }`}>
                      <span>🎙️ Voice: {selectedVoice.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* BIG PREMIUM GENERATE ACTION BUTTON */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  id="primary-generate-analysis"
                  onClick={handleGenerateVoice}
                  disabled={isAnalyzing || isSynthesizing || text.trim() === ''}
                  className={`flex-1 py-4 px-6 rounded-2xl font-display font-extrabold text-base tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xl hover:scale-[1.0125] ${
                    isAnalyzing || isSynthesizing || text.trim() === ''
                      ? 'bg-slate-800 text-slate-500 cursor-default opacity-50 shadow-none'
                      : 'bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-700 text-white shadow-indigo-600/20 hover:brightness-110 active:scale-[0.99]'
                  }`}
                >
                  <Cpu className="w-5 h-5" />
                  {isAnalyzing ? 'Running AI Engine...' : 'Generate Natural Voice'}
                </button>

                {/* Direct quick synthesize bypass button */}
                {selectedVoice && (
                  <button
                    id="quick-bypass-synthesize"
                    onClick={handleSynthesizeAudio}
                    disabled={isSynthesizing || isAnalyzing || text.trim() === ''}
                    title="Bypass text language analysis and synthesize with selected voice instantly"
                    className={`py-4 px-5 rounded-2xl font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer border transition-all ${
                      isSynthesizing || isAnalyzing || text.trim() === ''
                        ? 'bg-slate-800 text-slate-500 opacity-40 cursor-default'
                        : isDark
                          ? 'bg-slate-900 border-slate-850 text-slate-300 hover:bg-slate-800 hover:text-white'
                          : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-50'
                    }`}
                  >
                    ⚡ Fast Synth
                  </button>
                )}
              </div>
            </div>

            {/* Wave Player output widget & history log component side-by-side or stacked */}
            <AudioPlayerSection
              audioUrl={generatedAudioUrl}
              selectedVoice={selectedVoice}
              onRegenerate={handleSynthesizeAudio}
              isLoading={isSynthesizing}
              isDark={isDark}
            />

            <HistorySection
              history={history}
              onPlayItem={handlePlayHistoryItem}
              playPlayingItemId={playingHistoryId}
              onRestoreText={handleRestoreText}
              onDeleteItem={handleDeleteHistoryItem}
              onClearAll={handleClearAllHistory}
              isDark={isDark}
            />
          </section>

          {/* RHS Panel: Audio controls details (4 cols) */}
          <section className="lg:col-span-5 xl:col-span-4 space-y-6">
            
            {/* Active Voice details selector panel */}
            <div className={`p-5 rounded-3xl border transition-all duration-300 ${
              isDark 
                ? 'bg-slate-900/60 border-slate-850/80 text-slate-100' 
                : 'bg-white/80 border-slate-200 text-slate-900'
            } shadow-md backdrop-blur-md`}>
              <h3 className="text-md font-bold font-display flex items-center justify-between mb-4">
                <span>Active Vocalist</span>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 font-mono px-2 py-0.5 rounded-full select-none">
                  ElevenLabs Core
                </span>
              </h3>

              {selectedVoice ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl border ${
                    isDark ? 'bg-slate-950/40 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-indigo-600/10 border border-indigo-500/15 flex items-center justify-center font-display font-black text-xs text-indigo-400">
                          {selectedVoice.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-bold tracking-tight">{selectedVoice.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{selectedVoice.gender} • {selectedVoice.language}</div>
                        </div>
                      </div>
                      
                      <button
                        id="open-recommendations-drawer"
                        onClick={() => setIsRecommendPanelOpen(true)}
                        className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-550/10 bg-indigo-500/10 py-1.5 px-3 rounded-lg cursor-pointer font-sans"
                      >
                        Change Voice
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed mt-3 pt-3 border-t border-slate-800/10">
                      {selectedVoice.description}
                    </p>
                  </div>

                  {/* Audition Play Preview directly */}
                  <button
                    id="preset-voice-audition"
                    onClick={() => handlePreviewVoice(selectedVoice)}
                    className={`w-full py-2.5 px-4 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all border ${
                      previewPlayingVoiceId === selectedVoice.id
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 animate-pulse'
                        : isDark
                          ? 'bg-slate-900 border-slate-850 text-slate-320 hover:bg-slate-800 hover:text-white'
                          : 'bg-white border-slate-205 text-slate-650 hover:bg-slate-50 hover:text-indigo-600'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    {previewPlayingVoiceId === selectedVoice.id ? 'Auditioning Voice...' : `Audition Voice Preview`}
                  </button>
                </div>
              ) : (
                <div className="text-center text-slate-500 text-xs py-4">No vocalist highlighted. Click the search button.</div>
              )}
            </div>

            {/* VoiceControlsPanel Widget */}
            <VoiceControlsPanel
              settings={settings}
              onChange={setSettings}
              isDark={isDark}
            />

            {/* Help guidelines card */}
            <div className={`p-5 rounded-2xl border ${
              isDark ? 'bg-slate-900/20 border-slate-850/60' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-start gap-2.5">
                <Info className="w-4.5 h-4.5 text-indigo-400 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <div className="text-xs font-semibold">Pro Voice Directives</div>
                  <p className="text-[11px] leading-relaxed text-slate-500">
                    Just2Voice synthesizes high-definition PCM files using the official model Gemini TTS-Preview. Speed, styles, and pronunciation variables are applied server-side with zero latency.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Slide Recommended Matching Voice Panel */}
      <RecommendPanel
        isOpen={isRecommendPanelOpen}
        onClose={() => setIsRecommendPanelOpen(false)}
        analysis={analysisResult}
        selectedVoice={selectedVoice}
        onSelectVoice={(v) => {
          setSelectedVoice(v);
          setGeneratedAudioUrl(null); // Reset player so they generate new audio
        }}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        isDark={isDark}
        onPreviewVoice={handlePreviewVoice}
        previewPlayingVoiceId={previewPlayingVoiceId}
      />

      {/* Step-by-step full-screen overlay for text analysis / synthesis animations */}
      <AnimatePresence>
        {(isAnalyzing || isSynthesizing) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center shadow-2xl space-y-6"
            >
              {/* Spinner animation */}
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-slate-800/80" />
                <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-l-indigo-500 animate-spin" />
                <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold font-display text-slate-100">Orchestrating AI Voice</h3>
                <p className="text-xs text-slate-450 uppercase tracking-widest font-mono font-bold animate-pulse text-indigo-400">
                  {animationStep || 'Processing Data...'}
                </p>
              </div>

              {/* Step indicator tracker bar */}
              <div className="space-y-2 text-left bg-slate-950/40 p-4 rounded-2xl border border-slate-900 text-xs text-slate-400 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span>Linguistic Analysis Engine</span>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-400">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span>Tone Matching Engine</span>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-400">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                    <span>Vocal synthesis compilation</span>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-400">Ready</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-normal">
                Please wait while we synthesize studio quality speech file. This may take up to a few seconds.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
