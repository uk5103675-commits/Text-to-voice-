import React from 'react';
import { TtsSettings } from '../types';
import { 
  Volume2, 
  Gauge, 
  Sparkles, 
  Compass,
  Smile, 
  Activity,
  Maximize2
} from 'lucide-react';
import { customEmotions } from '../data/voices';

interface VoiceControlsPanelProps {
  settings: TtsSettings;
  onChange: (settings: TtsSettings) => void;
  isDark: boolean;
}

export default function VoiceControlsPanel({ settings, onChange, isDark }: VoiceControlsPanelProps) {
  const updateSetting = <K extends keyof TtsSettings>(key: K, value: TtsSettings[K]) => {
    onChange({
      ...settings,
      [key]: value
    });
  };

  // Helper to match emoji/icon representations for emotions
  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'Neutral': return '😐';
      case 'Happy': return '😊';
      case 'Sad': return '😢';
      case 'Inspirational': return '✨';
      case 'Serious': return '👔';
      case 'Documentary': return '🎙️';
      case 'News': return '📢';
      case 'Islamic': return '🌙';
      case 'Storytelling': return '📖';
      default: return '💬';
    }
  };

  return (
    <div className={`p-5 rounded-2xl border transition-all duration-300 ${
      isDark 
        ? 'bg-slate-900/60 border-slate-800/80 text-slate-100' 
        : 'bg-white/80 border-slate-200 text-slate-850'
    } shadow-lg backdrop-blur-md`}>
      <h3 className="text-lg font-semibold font-display flex items-center gap-2 mb-5">
        <Activity className="w-5 h-5 text-indigo-500 animate-pulse" />
        Advanced Voice Controls
      </h3>

      <div className="space-y-6">
        {/* Emotion Engine */}
        <div>
          <label className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-2 flex items-center justify-between">
            <span>Emotion / Style Engine</span>
            <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded-full flex items-center gap-1 font-mono">
              <Smile className="w-3 h-3" /> AI Directed
            </span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {customEmotions.map((emotion) => {
              const active = settings.emotion === emotion;
              return (
                <button
                  key={emotion}
                  id={`emotion-btn-${emotion.toLowerCase()}`}
                  onClick={() => updateSetting('emotion', emotion)}
                  className={`py-2 px-1 text-xs rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all border ${
                    active
                      ? 'border-indigo-500 bg-indigo-500/10 font-medium text-indigo-400'
                      : isDark
                        ? 'border-slate-800 bg-slate-900/30 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                  }`}
                >
                  <span className="text-lg">{getEmotionIcon(emotion)}</span>
                  <span className="truncate w-full text-center text-[10px]">{emotion}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Speed Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-455 font-medium flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-violet-500" />
              Speaking Speed (Tempo)
            </span>
            <span className="font-mono text-indigo-400 font-semibold">{settings.speed.toFixed(1)}x</span>
          </div>
          <input
            id="speed-range"
            type="range"
            min="0.5"
            max="2.0"
            step="0.1"
            value={settings.speed}
            onChange={(e) => updateSetting('speed', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>0.5x (Slow)</span>
            <span>1.0x (Normal)</span>
            <span>2.0x (Fast)</span>
          </div>
        </div>

        {/* Pitch Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-455 font-medium flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-sky-500" />
              Pitch Direction
            </span>
            <span className="font-mono text-indigo-400 font-semibold">
              {settings.pitch > 0 ? `+${settings.pitch}` : settings.pitch}
            </span>
          </div>
          <input
            id="pitch-range"
            type="range"
            min="-10"
            max="10"
            step="1"
            value={settings.pitch}
            onChange={(e) => updateSetting('pitch', parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>Bass-Heavy</span>
            <span>Harmonized</span>
            <span>Soprano Tone</span>
          </div>
        </div>

        {/* Volume & Pause controls side-by-side */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-455 font-medium flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-emerald-500" />
                Volume
              </span>
              <span className="font-mono text-indigo-400 font-semibold">{settings.volume}%</span>
            </div>
            <input
              id="volume-range"
              type="range"
              min="0"
              max="100"
              value={settings.volume}
              onChange={(e) => updateSetting('volume', parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-455 flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-amber-500 rotate-45" /> Pause Strength
            </label>
            <select
              id="pause-strength"
              value={settings.pauseStrength}
              onChange={(e) => updateSetting('pauseStrength', e.target.value as any)}
              className={`w-full py-1 px-2 text-xs rounded-lg border outline-none cursor-pointer transition-all ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-slate-300 focus:border-indigo-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-700 focus:border-indigo-500'
              }`}
            >
              <option value="Brief">Brief (0.2s)</option>
              <option value="Normal">Normal (0.5s)</option>
              <option value="Long">Long (1.2s)</option>
            </select>
          </div>
        </div>

        {/* Pronunciation Enhancement Switch */}
        <div className={`p-3.5 rounded-xl flex items-center justify-between border ${
          isDark 
            ? 'bg-slate-950/40 border-slate-800/60' 
            : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-semibold">Pronunciation Enhancer</div>
              <div className="text-[10px] text-slate-500 leading-normal">Optimizes deep stresses for Urdu, Hindko, Pashto & local dialects.</div>
            </div>
          </div>
          <button
            id="pronunciation-toggle"
            type="button"
            onClick={() => updateSetting('pronunciationEnhancement', !settings.pronunciationEnhancement)}
            className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-all duration-300 flex items-center ${
              settings.pronunciationEnhancement ? 'bg-indigo-600 justify-end' : 'bg-slate-650 justify-start'
            }`}
          >
            <div className="bg-white w-4 h-4 rounded-full shadow-md" />
          </button>
        </div>
      </div>
    </div>
  );
}
