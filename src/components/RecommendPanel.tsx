import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  Languages, 
  HelpCircle,
  Search, 
  Volume2, 
  Play, 
  Pause, 
  Check, 
  Crown,
  Filter
} from 'lucide-react';
import { AnalysisResponse, VoicePreset, TtsSettings } from '../types';
import { voicePresets } from '../data/voices';

interface RecommendPanelProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: AnalysisResponse | null;
  selectedVoice: VoicePreset | null;
  onSelectVoice: (voice: VoicePreset) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  isDark: boolean;
  onPreviewVoice: (voice: VoicePreset) => void;
  previewPlayingVoiceId: string | null;
}

export default function RecommendPanel({
  isOpen,
  onClose,
  analysis,
  selectedVoice,
  onSelectVoice,
  favorites,
  onToggleFavorite,
  isDark,
  onPreviewVoice,
  previewPlayingVoiceId
}: RecommendPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState<'All' | 'Male' | 'Female' | 'Special'>('All');

  // Compute sorted voice list
  // Auto-group recommended language voices first
  const sortedAndFilteredVoices = useMemo(() => {
    let list = [...voicePresets];

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(v => 
        v.name.toLowerCase().includes(q) || 
        v.language.toLowerCase().includes(q) ||
        v.style.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q)
      );
    }

    // Filter by gender
    if (genderFilter !== 'All') {
      list = list.filter(v => v.gender === genderFilter);
    }

    // Sort: Putting current detected language matches at the absolute top
    if (analysis && analysis.detectedLanguage) {
      const detectedLangLower = analysis.detectedLanguage.toLowerCase();
      
      list.sort((a, b) => {
        const aIsMatch = a.language.toLowerCase().includes(detectedLangLower) || detectedLangLower.includes(a.language.toLowerCase());
        const bIsMatch = b.language.toLowerCase().includes(detectedLangLower) || detectedLangLower.includes(b.language.toLowerCase());
        
        if (aIsMatch && !bIsMatch) return -1;
        if (!aIsMatch && bIsMatch) return 1;
        return 0;
      });
    }

    return list;
  }, [searchQuery, genderFilter, analysis]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950 z-40 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className={`fixed right-0 top-0 bottom-0 w-full max-w-md md:max-w-lg z-50 shadow-2xl flex flex-col ${
              isDark ? 'bg-slate-900 border-l border-slate-800 text-slate-100' : 'bg-slate-50 border-l border-slate-200 text-slate-900'
            }`}
          >
            {/* Header */}
            <div className={`p-5 flex items-center justify-between border-b ${
              isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white'
            }`}>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-500/10 rounded-xl">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display leading-tight">AI Voice Assistant</h3>
                  <p className="text-xs text-slate-400">Match recommendation & selection</p>
                </div>
              </div>
              <button
                id="close-recommendation"
                onClick={onClose}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-slate-100' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Analysis Summary */}
            {analysis && (
              <div className={`p-5 border-b shrink-0 ${
                isDark ? 'bg-gradient-to-r from-indigo-950/30 to-purple-950/20 border-slate-800' : 'bg-indigo-50/40 border-slate-250'
              }`}>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400">
                    <Languages className="w-4 h-4" />
                    <span>Real-time Text Analysis</span>
                  </div>
                  <div className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
                    <span>{(analysis.confidence * 100).toFixed(0)}% confident</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 mb-3">
                  <div className={`p-2.5 rounded-xl border ${
                    isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-white border-slate-200'
                  }`}>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Text Language</div>
                    <div className="text-sm font-bold font-display text-indigo-400 mt-0.5 flex items-center gap-1.5">
                      <span>🌏</span> {analysis.detectedLanguage}
                    </div>
                  </div>

                  <div className={`p-2.5 rounded-xl border ${
                    isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-white border-slate-200'
                  }`}>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Genre / Category</div>
                    <div className="text-sm font-bold font-display text-purple-400 mt-0.5 flex items-center gap-1.5">
                      <span>📝</span> {analysis.category}
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border flex gap-3 text-xs ${
                  isDark ? 'bg-slate-950/40 border-indigo-500/15 text-slate-300' : 'bg-white border-indigo-500/10 text-slate-600'
                }`}>
                  <span className="text-lg shrink-0 mt-0.5">💡</span>
                  <div>
                    <span className="font-semibold text-indigo-400">Recommendation suggestion: </span>
                    {analysis.reason}
                  </div>
                </div>
              </div>
            )}

            {/* Voices Filter & List Box */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Search Box */}
              <div className="relative">
                <Search className="w-4.5 h-4.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="recommend-panel-search"
                  type="text"
                  placeholder="Search by voice name, language or style..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl outline-none border transition-all ${
                    isDark 
                      ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-indigo-500' 
                      : 'bg-white border-slate-200 text-slate-800 focus:border-indigo-500'
                  }`}
                />
              </div>

              {/* Gender and Style Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1">
                {(['All', 'Male', 'Female', 'Special'] as const).map(tab => {
                  const active = genderFilter === tab;
                  return (
                    <button
                      key={tab}
                      id={`recommend-tab-${tab.toLowerCase()}`}
                      onClick={() => setGenderFilter(tab)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer shrink-0 transition-all ${
                        active
                          ? 'bg-indigo-505 bg-indigo-600 text-white shadow-md shadow-indigo-600/15'
                          : isDark
                            ? 'bg-slate-950/50 text-slate-400 hover:text-slate-200'
                            : 'bg-white text-slate-550 border border-slate-200 hover:border-slate-300 hover:text-slate-800'
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Voices List */}
              <div className="space-y-3">
                {sortedAndFilteredVoices.length === 0 ? (
                  <div className="text-center py-8 text-sm text-slate-500">
                    No voices found matching that criteria.
                  </div>
                ) : (
                  sortedAndFilteredVoices.map((voice) => {
                    const isSelected = selectedVoice?.id === voice.id;
                    const isFavorite = favorites.includes(voice.id);
                    const isAuditioning = previewPlayingVoiceId === voice.id;
                    
                    // Highlight if it matches the detected language in analysis
                    const isPrimaryRecommendation = analysis && (
                      voice.language.toLowerCase().includes(analysis.detectedLanguage.toLowerCase()) ||
                      analysis.detectedLanguage.toLowerCase().includes(voice.language.toLowerCase())
                    );

                    return (
                      <div
                        key={voice.id}
                        id={`voice-card-${voice.id}`}
                        className={`p-4 rounded-xl border relative transition-all duration-300 hover:scale-[1.01] ${
                          isSelected
                            ? 'border-indigo-500 bg-indigo-500/5 shadow-md shadow-indigo-500/5'
                            : isDark
                              ? 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {/* Recommendation Stamp */}
                        {isPrimaryRecommendation && (
                          <div className="absolute right-3 top-3 flex items-center gap-1 text-[9px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full tracking-wider font-mono uppercase">
                            <Crown className="w-3 h-3 text-indigo-400 animate-bounce" /> Best Match
                          </div>
                        )}

                        <div className="flex items-start gap-3">
                          {/* Play Preview Audition Circle */}
                          <button
                            id={`play-preview-${voice.id}`}
                            onClick={() => onPreviewVoice(voice)}
                            className={`p-2.5 rounded-full shrink-0 cursor-pointer transition-all ${
                              isAuditioning
                                ? 'bg-indigo-650 bg-indigo-600 text-white shadow-lg animate-pulse'
                                : isDark
                                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {isAuditioning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                          </button>

                          <div className="flex-1 min-w-0 pr-16">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm tracking-tight">{voice.name}</span>
                              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                                voice.gender === 'Male' ? 'bg-sky-500/10 text-sky-400' :
                                voice.gender === 'Female' ? 'bg-pink-500/10 text-pink-400' :
                                'bg-amber-500/10 text-amber-400'
                              }`}>
                                {voice.gender}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5 mt-1">
                              <span className="text-[10px] py-0.5 px-2 bg-slate-500/10 rounded text-slate-400">
                                🌏 {voice.language}
                              </span>
                              <span className="text-[10px] py-0.5 px-2 bg-slate-500/10 rounded text-slate-400">
                                🎙️ {voice.style}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                              {voice.description}
                            </p>
                          </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="flex items-center justify-between border-t mt-3.5 pt-3 border-dashed border-slate-800/10">
                          <button
                            id={`fav-toggle-${voice.id}`}
                            onClick={() => onToggleFavorite(voice.id)}
                            className={`text-[11px] font-medium flex items-center gap-1 cursor-pointer transition-all ${
                              isFavorite ? 'text-rose-500' : 'text-slate-455 hover:text-slate-300'
                            }`}
                          >
                            <span>♥</span> {isFavorite ? 'Favorited' : 'Add to Favorites'}
                          </button>

                          <button
                            id={`select-btn-${voice.id}`}
                            onClick={() => onSelectVoice(voice)}
                            className={`py-1.5 px-4 text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-emerald-600 text-white'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }`}
                          >
                            {isSelected ? (
                              <>
                                <Check className="w-3.5 h-3.5" /> Selected
                              </>
                            ) : (
                              'Select Voice'
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
