import React, { useState } from 'react';
import { HistoryItem } from '../types';
import { 
  Play, 
  Pause, 
  Trash2, 
  Download, 
  Clock, 
  ChevronRight, 
  CornerUpLeft,
  Languages,
  Check
} from 'lucide-react';

interface HistorySectionProps {
  history: HistoryItem[];
  onPlayItem: (item: HistoryItem) => void;
  playPlayingItemId: string | null;
  onRestoreText: (text: string) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
  isDark: boolean;
}

export default function HistorySection({
  history,
  onPlayItem,
  playPlayingItemId,
  onRestoreText,
  onDeleteItem,
  onClearAll,
  isDark
}: HistorySectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 ${
      isDark 
        ? 'bg-slate-900/40 border-slate-800 text-slate-100' 
        : 'bg-white border-slate-200 text-slate-900'
    } shadow-lg backdrop-blur-md`}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-500" />
          <h3 className="text-md font-bold font-display">Generation History</h3>
          <span className="text-xs bg-indigo-500/10 text-indigo-400 font-mono font-bold px-2 py-0.5 rounded-full">
            {history.length}
          </span>
        </div>
        
        {history.length > 0 && (
          <button
            id="clear-all-history"
            onClick={onClearAll}
            className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              isDark 
                ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20' 
                : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
            }`}
          >
            Clear All Logs
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className={`p-8 rounded-xl border text-center flex flex-col items-center justify-center gap-2 ${
          isDark ? 'bg-slate-950/20 border-slate-800/55' : 'bg-slate-50/50 border-slate-200'
        }`}>
          <div className="text-sm font-semibold text-slate-500">History is Empty</div>
          <p className="text-xs text-slate-500 max-w-sm leading-normal">
            Your generated audio chunks will appear here as reference blocks with player logs and immediate download shortcuts.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5 max-h-96 overflow-y-auto pr-1">
          {history.map((item) => {
            const isPlaying = playPlayingItemId === item.id;
            
            return (
              <div
                key={item.id}
                id={`history-item-${item.id}`}
                className={`p-3.5 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                  isDark 
                    ? 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700' 
                    : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Information LHS */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <button
                    id={`play-history-${item.id}`}
                    onClick={() => onPlayItem(item)}
                    className={`p-2.5 rounded-full shrink-0 cursor-pointer transition-all ${
                      isPlaying 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' 
                        : isDark
                          ? 'bg-slate-850 hover:bg-slate-800 text-indigo-400'
                          : 'bg-white border text-indigo-600 hover:bg-indigo-50'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current animate-pulse" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>

                  <div className="flex-1 min-w-0 space-y-1">
                    <p className={`text-xs font-medium leading-relaxed truncate max-w-lg ${
                      isDark ? 'text-slate-200' : 'text-slate-800'
                    }`}>
                      "{item.text}"
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-550 font-mono">
                      <span className="font-semibold text-indigo-400">{item.voiceName}</span>
                      <span className="text-slate-500">•</span>
                      <span>{item.language}</span>
                      <span className="text-slate-500">•</span>
                      <span className="bg-purple-500/10 text-purple-400 px-1.5 py-0.2 rounded font-sans font-medium">{item.category}</span>
                      <span className="text-slate-500">•</span>
                      <span>{item.settings.speed}x speed</span>
                    </div>
                  </div>
                </div>

                {/* Actions RHS */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  {/* Load Text back in textarea */}
                  <button
                    id={`restore-text-${item.id}`}
                    onClick={() => onRestoreText(item.text)}
                    title="Load original text into visualizer"
                    className={`p-2 rounded-lg cursor-pointer transition-all ${
                      isDark 
                        ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-500/20'
                    }`}
                  >
                    <CornerUpLeft className="w-3.5 h-3.5" />
                  </button>

                  {/* Copy Text */}
                  <button
                    id={`copy-history-${item.id}`}
                    onClick={() => handleCopyText(item.text, item.id)}
                    title="Copy Text to clipboard"
                    className={`text-[11px] px-2 py-1.5 rounded-lg border cursor-pointer font-sans transition-all ${
                      copiedId === item.id 
                        ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400' 
                        : isDark
                          ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          : 'bg-white border-slate-200 text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    {copiedId === item.id ? 'Copied' : 'Copy'}
                  </button>

                  {/* Download Audio */}
                  <a
                    id={`download-history-${item.id}`}
                    href={item.audioUrl}
                    download={`just2voice-${item.voiceId}-${Date.now()}.wav`}
                    className={`p-2 rounded-lg cursor-pointer transition-all ${
                      isDark 
                        ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-500/20'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>

                  {/* Delete Item */}
                  <button
                    id={`delete-history-${item.id}`}
                    onClick={() => onDeleteItem(item.id)}
                    title="Delete generation record"
                    className={`p-2 rounded-lg cursor-pointer transition-all ${
                      isDark 
                        ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-450 hover:bg-rose-500/10 hover:border-rose-500/20' 
                        : 'bg-white border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50'
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
