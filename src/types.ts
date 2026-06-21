export interface VoicePreset {
  id: string;
  name: string;
  gender: 'Male' | 'Female' | 'Special';
  style: string;
  language: string;
  accent: string;
  prebuiltVoiceName: 'Kore' | 'Zephyr' | 'Puck' | 'Charon' | 'Fenrir';
  description: string;
  previewText: string;
  isPopular?: boolean;
}

export interface TtsSettings {
  speed: number; // 0.5 to 2.0
  pitch: number; // -10 to +10 (relative) or speed instructions
  volume: number; // 0 to 100
  emotion: string; // Neutral, Happy, Sad, Inspirational, etc.
  pauseStrength: 'Brief' | 'Normal' | 'Long';
  pronunciationEnhancement: boolean;
}

export interface AnalysisResponse {
  detectedLanguage: string;
  category: string;
  suggestedEmotion: string;
  reason: string;
  confidence: number;
}

export interface HistoryItem {
  id: string;
  text: string;
  voiceName: string;
  voiceId: string;
  language: string;
  category: string;
  emotion: string;
  audioUrl: string; // raw base64 data:audio/wav or blob URL
  date: string;
  settings: TtsSettings;
}
