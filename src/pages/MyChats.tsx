import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Search, Plus, X } from "lucide-react";
import { useState } from "react";

export default function MyChats() {
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [friendCode, setFriendCode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddFriend = () => {
    if (friendCode.trim()) {
      alert(`Friend added with code: ${friendCode}`);
      setFriendCode("");
      setShowAddFriendModal(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
              My Chats <span className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">2</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Your private conversations</p>
          </div>
          <Button
            onClick={() => setShowAddFriendModal(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or friend code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          {searchTerm && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              Searching for: <span className="font-semibold">{searchTerm}</span>
            </p>
          )}
        </div>

        {/* Chat List */}
        <div className="space-y-4">
          {[
            {
              id: "1",
              initials: "AC",
              name: "Alex Chen",
              message: "Thanks for the help!",
              time: "5 min ago",
              color: "bg-blue-500",
            },
            {
              id: "2",
              initials: "SJ",
              name: "Sarah Johnson",
              message: "Can you help me with this problem?",
              time: "1 hour ago",
              color: "bg-green-500",
            },
            {
              id: "3",
              initials: "MR",
              name: "Mike Rodriguez",
              message: "See you at the study session!",
              time: "Yesterday",
              color: "bg-orange-500",
            },
            {
              id: "4",
              initials: "EW",
              name: "Emma Wilson",
              message: "Great explanation, thanks!",
              time: "2 days ago",
              color: "bg-pink-500",
            },
          ].map((chat) => (
            <div key={chat.id}>
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:border-primary/50 transition cursor-pointer">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 ${chat.color} rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0`}
                  >
                    {chat.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {chat.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {chat.message}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                    {chat.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Chat Assistant */}
        <div className="mt-8 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-xl p-6 border border-primary/20 dark:border-primary/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                AI Chat Assistant
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get instant help with your studies. Ask questions anytime!
              </p>
            </div>
            <Button
              onClick={() => {
                alert("Starting AI Chat... New conversation opened!");
              }}
              className="bg-primary hover:bg-primary/90"
            >
              Start AI Chat
            </Button>
          </div>
        </div>

        {/* Add Friend Modal */}
        {showAddFriendModal && (
          <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl max-w-md w-full p-6 border border-gray-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Add Friend via Code
                </h2>
                <button
                  onClick={() => setShowAddFriendModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Friend Code
                  </label>
                  <input
                    type="text"
                    value={friendCode}
                    onChange={(e) => setFriendCode(e.target.value)}
                    placeholder="Enter friend's code (e.g., AC-2024-789)"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  You can find your friend's code on their profile page.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddFriend}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                >
                  Add Friend
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddFriendModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
