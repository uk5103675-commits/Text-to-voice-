import React, { useRef, useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Download, 
  RefreshCw, 
  Volume2, 
  HelpCircle,
  FileAudio
} from 'lucide-react';
import { VoicePreset } from '../types';

interface AudioPlayerSectionProps {
  audioUrl: string | null;
  selectedVoice: VoicePreset | null;
  onRegenerate: () => void;
  isLoading: boolean;
  isDark: boolean;
}

export default function AudioPlayerSection({
  audioUrl,
  selectedVoice,
  onRegenerate,
  isLoading,
  isDark
}: AudioPlayerSectionProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const animationFrameId = useRef<number | null>(null);

  // Audio state synchronization
  useEffect(() => {
    if (audioUrl) {
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.load();
        setIsPlaying(false);
        setCurrentTime(0);
      }
    }
  }, [audioUrl]);

  // Sync volume with element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Sync playback speed with element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Audio Playback Listeners
  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const onAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    drawStaticWaveform();
  };

  const togglePlay = () => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        startVisualizer();
      }).catch(err => {
        console.error("Audio playback error:", err);
      });
    }
  };

  const stopAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    drawStaticWaveform();
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  // WAV download trigger
  const handleDownload = () => {
    if (!audioUrl) return;
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = `just2voice-${selectedVoice?.name.replace(/\s+/g, '-').toLowerCase() || 'audio'}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Draw simulated static waveforms on mount or when audio changes
  const drawStaticWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const barCount = 45;
    const barWidth = width / barCount;

    for (let i = 0; i < barCount; i++) {
      const h = 5 + Math.abs(Math.sin(i * 0.15)) * (height * 0.4);
      const x = i * barWidth + barWidth / 2;
      ctx.moveTo(x, height / 2 - h);
      ctx.lineTo(x, height / 2 + h);
    }
    ctx.stroke();
  };

  // Dynamic animated wave visualizer
  const startVisualizer = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const draw = () => {
      if (!isPlaying) return;
      ctx.clearRect(0, 0, width, height);

      const barCount = 45;
      const barWidth = width / barCount;
      const currentTimeScale = Date.now() * 0.005;

      for (let i = 0; i < barCount; i++) {
        // Generate nice looking sine-driven amplitude based on position, time and current audio progress
        const modifier = Math.sin(i * 0.3 + currentTimeScale) * Math.cos(i * 0.1);
        const amp = 5 + Math.abs(modifier) * (height * 0.7);

        // Gradient coloring
        const grad = ctx.createLinearGradient(0, height / 2 - amp, 0, height / 2 + amp);
        grad.addColorStop(0, '#a78bfa'); // purple
        grad.addColorStop(0.5, '#4f46e5'); // indigo
        grad.addColorStop(1, '#3b82f6'); // blue

        ctx.fillStyle = grad;
        const x = i * barWidth + 2;
        const w = barWidth - 3;
        ctx.fillRect(x, height / 2 - amp / 2, w, amp);
      }

      animationFrameId.current = requestAnimationFrame(draw);
    };

    draw();
  };

  useEffect(() => {
    drawStaticWaveform();
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [audioUrl, isDark]);

  // Format second counts neatly
  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
      isDark 
        ? 'bg-slate-900/40 border-slate-800 text-slate-100' 
        : 'bg-white border-slate-200 text-slate-900'
    } shadow-xl backdrop-blur-md`}>
      
      {/* Background glow when playing */}
      {isPlaying && (
        <div className="absolute inset-0 bg-indigo-500/5 pulse pointer-events-none" />
      )}

      <h3 className="text-md font-bold font-display flex items-center gap-2 mb-4">
        <FileAudio className="w-5 h-5 text-indigo-500" />
        Studio Audio Output
      </h3>

      {/* Hidden native audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onAudioEnded}
      />

      <div className="space-y-4">
        {audioUrl ? (
          <>
            {/* Display Waveform Canvas */}
            <div className={`rounded-xl h-24 overflow-hidden flex items-center justify-center border relative ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <canvas
                ref={canvasRef}
                width={400}
                height={96}
                className="w-full h-full block"
              />
              {isLoading && (
                <div className="absolute inset-0 bg-slate-950/50 flex items-center justify-center text-xs gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
                  <span>Synthesizing...</span>
                </div>
              )}
            </div>

            {/* Time scrubbing bar */}
            <div className="space-y-1">
              <input
                id="playback-progress"
                type="range"
                min="0"
                max={duration || 0}
                step="0.05"
                value={currentTime}
                onChange={handleScrub}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between items-center text-[11px] text-slate-500 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Audio Panel Settings Bar */}
            <div className="flex items-center justify-between gap-4">
              {/* Play / pause buttons */}
              <div className="flex items-center gap-2">
                <button
                  id="output-play-toggle"
                  onClick={togglePlay}
                  className="w-11 h-11 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 cursor-pointer transition-all hover:scale-105"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>

                <button
                  id="output-stop-btn"
                  onClick={stopAudio}
                  disabled={!isPlaying && currentTime === 0}
                  className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                    isPlaying || currentTime > 0
                      ? isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-705'
                        : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      : 'opacity-40 cursor-default'
                  }`}
                >
                  <Square className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Adjust speed & volume slider inside player optionally */}
              <div className="flex items-center gap-2">
                <select
                  id="playback-rate-select"
                  value={playbackRate}
                  onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                  className={`text-[11px] py-1 px-2 border rounded-lg font-mono outline-none cursor-pointer transition-all ${
                    isDark 
                      ? 'bg-slate-900 border-slate-800 text-slate-350 hover:bg-slate-800' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <option value="0.75">0.75x</option>
                  <option value="1.0">1.0x</option>
                  <option value="1.25">1.25x</option>
                  <option value="1.5">1.5x</option>
                  <option value="2.0">2.0x</option>
                </select>

                <button
                  id="download-output-wav"
                  onClick={handleDownload}
                  className="py-2 px-3 bg-indigo-600/10 text-indigo-400 font-semibold text-xs rounded-xl flex items-center gap-1.5 hover:bg-indigo-600 hover:text-white cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4" /> Download WAV
                </button>

                <button
                  id="regenerate-output-btn"
                  onClick={onRegenerate}
                  title="Regenerate Voice Style"
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    isDark 
                      ? 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className={`p-8 rounded-xl border text-center flex flex-col items-center justify-center gap-2.5 ${
            isDark ? 'bg-slate-950/20 border-slate-800/60' : 'bg-slate-50/50 border-slate-200'
          }`}>
            <div className="p-3 bg-indigo-500/5 rounded-full text-indigo-400/60 font-mono">
              ★ Just2Voice Engine
            </div>
            <div className="text-sm font-semibold text-slate-500">
              No Studio Audio Generated Yet
            </div>
            <p className="text-xs text-slate-500 max-w-xs leading-normal">
              Type or paste your multi-lingual voice text above and click generate to process clean vocal files.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
