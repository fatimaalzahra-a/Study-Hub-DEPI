import { useState, useEffect } from "react";
import { Play, Pause, Volume2, X, Music } from "lucide-react";

interface MusicPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MusicPlayer({ isOpen, onClose }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useState<HTMLAudioElement | null>(null)[1];

  // Audio playlist URLs (using web audio API simulation)
  const playlist = [
    { name: "Lo-fi Hip Hop - Chill Study", duration: 240 },
    { name: "Jazz Classics - Focus Mode", duration: 300 },
    { name: "Ambient Sounds - Meditation", duration: 270 },
    { name: "Piano - Deep Work", duration: 250 },
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          // Go to next track
          if (currentTrack < playlist.length - 1) {
            setCurrentTrack(currentTrack + 1);
            setDuration(playlist[currentTrack + 1].duration);
          } else {
            setIsPlaying(false);
          }
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, duration, currentTrack, playlist]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-gradient-to-br from-primary to-secondary text-white rounded-lg shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Music className="w-5 h-5" />
          </div>
          <div className="text-sm font-semibold">Study Music</div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Now Playing */}
        <div className="text-center">
          <p className="text-sm font-medium mb-1">Now Playing</p>
          <p className="text-xs text-white/80">{playlist[currentTrack].name}</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="bg-white h-full transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-white/70">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-2">
          {/* Previous */}
          <button
            onClick={() => {
              if (currentTrack > 0) {
                setCurrentTrack(currentTrack - 1);
                setCurrentTime(0);
                setDuration(playlist[currentTrack - 1].duration);
              }
            }}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition text-xs font-semibold"
            title="Previous"
          >
            ⏮
          </button>

          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 bg-white/30 hover:bg-white/40 rounded-full flex items-center justify-center transition"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" />
            )}
          </button>

          {/* Next */}
          <button
            onClick={() => {
              if (currentTrack < playlist.length - 1) {
                setCurrentTrack(currentTrack + 1);
                setCurrentTime(0);
                setDuration(playlist[currentTrack + 1].duration);
              }
            }}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition text-xs font-semibold"
            title="Next"
          >
            ⏭
          </button>

          {/* Volume */}
          <div className="flex items-center gap-1 flex-1 px-2">
            <Volume2 className="w-4 h-4 flex-shrink-0" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={(e) => setVolume(Number(e.target.value) / 100)}
              className="flex-1 h-2 bg-white/20 rounded-full appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Playlist Preview */}
        <div className="bg-white/10 rounded-lg p-3 text-xs space-y-2">
          <p className="font-medium">Playlist</p>
          <div className="space-y-1 text-white/70 max-h-20 overflow-y-auto">
            {playlist.map((track, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentTrack(idx);
                  setCurrentTime(0);
                  setDuration(track.duration);
                  setIsPlaying(true);
                }}
                className={`w-full text-left hover:text-white transition ${
                  idx === currentTrack ? "text-white font-semibold bg-white/10 px-2 py-1 rounded" : ""
                }`}
              >
                {idx === currentTrack ? "▶ " : "  "} {track.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
