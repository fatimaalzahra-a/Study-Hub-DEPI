import { DashboardLayout } from "@/components/DashboardLayout";
import { Music, Headphones, Volume2 } from "lucide-react";

export default function StudyMusic() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Study Music 🎵
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Curated playlists to help you focus and study
        </p>

        {/* Info Box */}
        <div className="bg-primary/10 dark:bg-primary/20 border border-primary/30 rounded-xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <Headphones className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Music Player Active
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                The music player is now open in the bottom right corner. You can control playback, adjust volume, and switch between playlists while studying.
              </p>
            </div>
          </div>
        </div>

        {/* Playlists Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "🎧",
              title: "Lo-fi Hip Hop",
              description: "Chill beats for focused study sessions",
              tracks: 45,
            },
            {
              icon: "🎹",
              title: "Piano Classics",
              description: "Beautiful piano compositions for deep work",
              tracks: 32,
            },
            {
              icon: "🌊",
              title: "Ambient Sounds",
              description: "Natural sounds and atmospheric music",
              tracks: 28,
            },
            {
              icon: "🎷",
              title: "Jazz Study Mix",
              description: "Smooth jazz for creative thinking",
              tracks: 40,
            },
            {
              icon: "🌙",
              title: "Night Study",
              description: "Mellow tunes for late night sessions",
              tracks: 35,
            },
            {
              icon: "🎶",
              title: "Focus Flow",
              description: "Uplifting electronic music for productivity",
              tracks: 50,
            },
          ].map((playlist, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 hover:shadow-lg transition cursor-pointer"
            >
              <div className="text-4xl mb-4">{playlist.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {playlist.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {playlist.description}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {playlist.tracks} tracks
              </p>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-gray-50 dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Volume2 className="w-6 h-6" />
            Study Music Tips
          </h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex gap-3">
              <span className="text-primary font-semibold">✓</span>
              <span>Use instrumental music to avoid lyrics distracting you</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-semibold">✓</span>
              <span>Adjust volume to a level that helps you focus (not too loud)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-semibold">✓</span>
              <span>Try different playlists to find what works best for you</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-semibold">✓</span>
              <span>Consistent music can help train your brain for focus</span>
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
