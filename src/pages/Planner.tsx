import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, Clock, Target, Flame, CheckCircle, Settings, TrendingUp, X } from "lucide-react";
import { useState } from "react";

export default function Planner() {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskSubject, setTaskSubject] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");
  const [taskDueDate, setTaskDueDate] = useState("");

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      alert(`Task "${taskTitle}" added for ${taskSubject}!`);
      setTaskTitle("");
      setTaskSubject("");
      setTaskPriority("Medium");
      setTaskDueDate("");
      setShowAddTaskModal(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
              Study Planner 📋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Plan your study sessions and track your progress
            </p>
          </div>
          <div className="flex gap-3">
            <button className="p-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <Button
              onClick={() => setShowAddTaskModal(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>

        {/* Calendar and Weekly Goal */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Weekly Progress Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Weekly Progress
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your study hours this week
                </p>
              </div>
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-semibold">+12%</span>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end justify-around h-48 gap-3 mb-6 px-2">
              {[
                { day: "Mon", hours: 3, target: 7 },
                { day: "Tue", hours: 4, target: 7 },
                { day: "Wed", hours: 2.5, target: 7 },
                { day: "Thu", hours: 5, target: 7 },
                { day: "Fri", hours: 4.5, target: 7 },
                { day: "Sat", hours: 6.5, target: 7 },
                { day: "Sun", hours: 3, target: 7 },
              ].map((item) => (
                <div key={item.day} className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className="w-full bg-primary dark:bg-primary rounded-t-lg transition hover:bg-primary/80"
                    style={{ height: `${(item.hours / item.target) * 100}%` }}
                  ></div>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-200 dark:border-slate-700 pt-6">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Total Study Hours</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">28.5h</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Weekly Goal</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">40h</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Completion</p>
                <p className="text-2xl font-bold text-primary">71%</p>
              </div>
            </div>
          </div>

          {/* Weekly Goal Card */}
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-xl p-6 border border-primary/20 dark:border-primary/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary dark:bg-primary rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Weekly Goal</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Keep up momentum!</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Study Time
                  </span>
                  <span className="text-lg font-bold text-primary">24.5 / 30 hrs</span>
                </div>
                <div className="bg-gray-200 dark:bg-slate-600 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full"
                    style={{ width: "82%" }}
                  ></div>
                </div>
              </div>

              <div className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  You're 5.5 hours away from your weekly goal. Keep studying!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Tasks */}
        <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Tasks</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">3 tasks remaining</p>
            </div>
            <Button
              onClick={() => setShowAddTaskModal(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>

          <div className="space-y-3">
            {[
              {
                title: "Review Quantum Physics Chapter 1-3",
                subject: "Physics",
                priority: "High",
                dueDate: "Today",
                completed: false,
              },
              {
                title: "Complete Organic Chemistry Lab Report",
                subject: "Chemistry",
                priority: "Medium",
                dueDate: "Tomorrow",
                completed: false,
              },
              {
                title: "Study Linear Algebra Practice Problems",
                subject: "Mathematics",
                priority: "High",
                dueDate: "This Week",
                completed: false,
              },
            ].map((task, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {task.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {task.subject}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        task.priority === "High"
                          ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                          : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {task.dueDate}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Add Task Modal */}
        {showAddTaskModal && (
          <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl max-w-md w-full p-6 border border-gray-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Add New Task
                </h2>
                <button
                  onClick={() => setShowAddTaskModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Task Title
                  </label>
                  <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="e.g., Complete Chemistry Lab Report"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={taskSubject}
                    onChange={(e) => setTaskSubject(e.target.value)}
                    placeholder="e.g., Chemistry"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Due Date
                  </label>
                  <input
                    type="text"
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                    placeholder="e.g., Tomorrow, This Week, Today"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddTask}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                >
                  Add Task
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddTaskModal(false)}
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
