import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Eye,
  Bell,
  Clock,
  BarChart3,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function FocusMode() {
  const [isFocusActive, setIsFocusActive] = useState(false);
  const [focusTime, setFocusTime] = useState(25);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!isFocusActive) return;

    const interval = setInterval(() => {
      setElapsedTime((prev) => {
        const totalSeconds = focusTime * 60;
        if (prev >= totalSeconds) {
          setIsFocusActive(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isFocusActive, focusTime]);

  useEffect(() => {
    if (!isFocusActive) {
      setElapsedTime(0);
    }
  }, [focusTime, isFocusActive]);

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          <Zap className="w-8 h-8 inline mr-2 text-primary" />
          Focus Mode
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Eliminate distractions and focus on your studies
        </p>

        {/* Main Focus Card */}
        <div className={`border rounded-xl p-12 mb-8 transition ${
          isFocusActive
            ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-300 dark:border-green-700"
            : "bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 border border-primary/30 dark:border-primary/30"
        }`}>
          <div className="text-center">
            <h2 className={`text-2xl font-bold mb-4 ${
              isFocusActive
                ? "text-green-900 dark:text-green-100"
                : "text-gray-900 dark:text-white"
            }`}>
              {isFocusActive ? "🎯 Focus Session Active" : "Ready to Focus?"}
            </h2>

            {/* Timer Circle */}
            <div className={`w-48 h-48 mx-auto mb-8 rounded-full flex items-center justify-center shadow-lg transition-all ${
              isFocusActive
                ? "bg-gradient-to-br from-primary to-secondary animate-pulse"
                : "bg-gradient-to-br from-primary to-secondary"
            }`}>
              <div className="text-center">
                <p className="text-white/80 text-sm">Time Remaining</p>
                <p className="text-5xl font-bold text-white font-mono">
                  {Math.floor((focusTime * 60 - elapsedTime) / 60)}:
                  {String((focusTime * 60 - elapsedTime) % 60).padStart(2, "0")}
                </p>
                {isFocusActive && (
                  <p className="text-white text-xs mt-2">Session Active</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {!isFocusActive && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Focus Duration
                  </label>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => setFocusTime(Math.max(5, focusTime - 5))}
                      className="px-4 py-2 bg-gray-200 dark:bg-slate-700 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white w-20">
                      {focusTime} min
                    </span>
                    <button
                      onClick={() => setFocusTime(Math.min(120, focusTime + 5))}
                      className="px-4 py-2 bg-gray-200 dark:bg-slate-700 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <Button
                onClick={() => {
                  if (isFocusActive) {
                    setIsFocusActive(false);
                    setElapsedTime(0);
                  } else {
                    setIsFocusActive(true);
                    setElapsedTime(0);
                  }
                }}
                className={`w-full text-white text-lg py-6 transition ${
                  isFocusActive
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-primary hover:bg-primary/90"
                }`}
              >
                {isFocusActive ? "Stop Focus Session" : "Start Focus Session"}
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
            <Eye className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Block Distractions
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Hide notifications and social media during your focus session
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
            <Clock className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Pomodoro Timer
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Customize your work and break intervals for optimal productivity
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
            <BarChart3 className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Track Progress
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Monitor your focus sessions and build productive habits
            </p>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Bell className="w-6 h-6" />
            Focus Mode Settings
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Silence Notifications
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pause all notifications during focus session
                </p>
              </div>
              <input
                type="checkbox"
                className="w-5 h-5 text-primary rounded"
                defaultChecked
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Break Reminders
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get reminded to take breaks during long sessions
                </p>
              </div>
              <input
                type="checkbox"
                className="w-5 h-5 text-primary rounded"
                defaultChecked
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Auto-Lock Apps
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Prevent access to distracting applications
                </p>
              </div>
              <input
                type="checkbox"
                className="w-5 h-5 text-primary rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
