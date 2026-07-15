import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Brain,
  LayoutDashboard,
  Users,
  MessageCircle,
  MessageSquare,
  Calendar,
  Music,
  Zap,
  LogOut,
  Search,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { MusicPlayer } from "./MusicPlayer";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "./AuthProvider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(() => {
    return location.pathname === "/study-music";
  });

  useEffect(() => {
    setIsMusicPlayerOpen(location.pathname === "/study-music");
  }, [location.pathname]);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Users, label: "Study Groups", href: "/study-groups" },
    { icon: MessageCircle, label: "My Chats", href: "/my-chats" },
    { icon: MessageSquare, label: "Community", href: "/community" },
    { icon: Calendar, label: "Planner", href: "/planner" },
  ];

  const quickActions = [
    { icon: Zap, label: "Focus Mode", href: "/focus-mode" },
    { icon: Music, label: "Study Music", href: "/study-music" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex relative">
      {/* Music Player */}
      <MusicPlayer
        isOpen={isMusicPlayerOpen}
        onClose={() => setIsMusicPlayerOpen(false)}
      />

      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 h-screen overflow-y-auto">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Mnemora
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                AI Study Hub
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition",
                    isActive
                      ? "bg-primary/10 text-primary dark:bg-primary/20"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase px-4 mb-3">
              Quick Actions
            </p>
            <div className="space-y-1">
              {quickActions.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Pro Section */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
            <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 mb-4">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Pro</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Upgrade to Pro
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
                Unlock advanced AI features
              </p>
              <Button
                size="sm"
                className="w-full bg-primary hover:bg-primary/90 text-white cursor-pointer"
                onClick={() => navigate("/upgrade")}
              >
                Upgrade Now
              </Button>
            </div>

            {/* User Section */}
            <div className="border-t border-gray-200 dark:border-slate-700 pt-4 space-y-2">
              <div className="flex items-center gap-3 px-2 py-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-semibold">
                  {user?.fullName?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "U"}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {user?.fullName || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Free Plan
                  </p>
                </div>
              </div>
              <button
                onClick={() => { logout(); navigate("/sign-in"); }}
                className="flex items-center gap-3 px-2 py-3 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition w-full"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 h-16 flex items-center justify-between px-8">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-950">
          {children}
        </div>
      </main>
    </div>
  );
}
