import { useState, useEffect, useMemo } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  Zap,
  TrendingUp,
  X,
  MessageSquare,
  Clock,
  Send,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

interface Reply {
  id: string;
  user: string;
  text: string;
  createdAt: string;
}

interface Question {
  id: string;
  title: string;
  body: string;
  tags: string[];
  user: string;
  votes: number;
  answers: number;
  views: number;
  createdAt: string;
  replies: Reply[];
}

const STORAGE_KEY = "community_questions";

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: "sample-1",
    title: "How does gradient descent work in neural networks?",
    body: "I'm trying to understand the intuition behind gradient descent and how it's used to train neural networks. Can someone explain it in simple terms?",
    tags: ["neural-networks", "optimization", "ml"],
    user: "Alex Chen",
    votes: 24,
    answers: 3,
    views: 182,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    replies: [
      { id: "r1", user: "Sarah Johnson", text: "Think of it like rolling a ball down a hill. The ball always rolls in the direction that goes downhill the fastest. Gradient descent does the same thing but in math — it finds the direction that reduces the error the most and takes a step that way.", createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString() },
      { id: "r2", user: "Mike Rivera", text: "The 'gradient' is just the slope of the error function. You compute it, then move your weights in the opposite direction. Each step gets you closer to the minimum error.", createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
      { id: "r3", user: "Emma Wilson", text: "A good resource is the 3Blue1Brown video on gradient descent on YouTube — it makes it very visual and easy to understand.", createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString() },
    ],
  },
  {
    id: "sample-2",
    title: "Difference between prokaryotic and eukaryotic cells",
    body: "Can someone explain the key structural differences between prokaryotic and eukaryotic cells? I have an exam coming up.",
    tags: ["biology", "cells"],
    user: "Sarah Johnson",
    votes: 18,
    answers: 2,
    views: 145,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    replies: [
      { id: "r4", user: "Alex Chen", text: "Prokaryotes (like bacteria) have no nucleus — their DNA floats freely. Eukaryotes (like plant and animal cells) have a nucleus and membrane-bound organelles like mitochondria and ER.", createdAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString() },
      { id: "r5", user: "David Park", text: "Also prokaryotes are usually much smaller (0.1-5 μm) and simpler. Eukaryotes can be 10-100 μm and have complex internal structures.", createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
    ],
  },
  {
    id: "sample-3",
    title: "What is the chain rule in calculus?",
    body: "I keep getting confused when applying the chain rule to composite functions. Can someone break it down simply?",
    tags: ["calculus", "derivatives", "math"],
    user: "Mike Rivera",
    votes: 31,
    answers: 2,
    views: 230,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    replies: [
      { id: "r6", user: "Emma Wilson", text: "The chain rule says: if you have f(g(x)), the derivative is f'(g(x)) * g'(x). Basically take the derivative of the outer function (keeping the inner the same) and multiply by the derivative of the inner function.", createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
      { id: "r7", user: "Alex Chen", text: "A good trick: work from outside in. For sin(x²), outer is sin(·) → cos(·), inner is x² → 2x. So derivative is cos(x²) * 2x.", createdAt: new Date(Date.now() - 4.5 * 60 * 60 * 1000).toISOString() },
    ],
  },
  {
    id: "sample-4",
    title: "How do I solve integration by parts?",
    body: "What's the best strategy for choosing u and dv in integration by parts problems?",
    tags: ["calculus", "integration", "math"],
    user: "Emma Wilson",
    votes: 12,
    answers: 2,
    views: 98,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    replies: [
      { id: "r8", user: "Mike Rivera", text: "Use the LIATE rule to pick u: Logarithmic, Inverse trig, Algebraic, Trig, Exponential — whichever comes first in that list, let that be u.", createdAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString() },
      { id: "r9", user: "Sarah Johnson", text: "Also remember the formula is ∫u dv = uv - ∫v du. Practice with ∫x·eˣ dx — it's the classic example.", createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString() },
    ],
  },
  {
    id: "sample-5",
    title: "Explain Schrödinger's cat thought experiment",
    body: "I've heard about this experiment but I don't fully grasp the quantum mechanics behind it. Can someone explain?",
    tags: ["quantum-physics", "physics"],
    user: "David Park",
    votes: 42,
    answers: 2,
    views: 312,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    replies: [
      { id: "r10", user: "Alex Chen", text: "Schrödinger proposed it to show how absurd quantum superposition looks at a macro scale. A cat in a box with a random poison trigger is both alive AND dead until you open the box and observe it.", createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString() },
      { id: "r11", user: "Emma Wilson", text: "It's really about the measurement problem in quantum mechanics. Before observation, particles exist in superposition of all possible states. The cat metaphor makes this counterintuitive concept more tangible.", createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString() },
    ],
  },
];

function loadQuestions(): Question[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((q: Question) => ({ ...q, replies: q.replies || [] }));
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_QUESTIONS));
    return SAMPLE_QUESTIONS;
  } catch {
    return SAMPLE_QUESTIONS;
  }
}

function saveQuestions(questions: Question[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
}

function timeAgo(isoDate: string): string {
  const seconds = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function Community() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>(loadQuestions);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [newTags, setNewTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"trending" | "recent" | "unanswered">("trending");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    saveQuestions(questions);
  }, [questions]);

  useEffect(() => {
    if (selectedQuestion) {
      const updated = questions.find((q) => q.id === selectedQuestion.id);
      if (updated) setSelectedQuestion(updated);
    }
  }, [questions, selectedQuestion?.id]);

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase().replace(/\s+/g, "-");
    if (tag && !newTags.includes(tag) && newTags.length < 5) {
      setNewTags([...newTags, tag]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setNewTags(newTags.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = () => {
    if (!newTitle.trim() || !user) return;

    const question: Question = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      body: newBody.trim(),
      tags: newTags,
      user: user.fullName,
      votes: 0,
      answers: 0,
      views: 0,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    setQuestions([question, ...questions]);
    setNewTitle("");
    setNewBody("");
    setNewTags([]);
    setShowForm(false);
  };

  const handleVote = (id: string) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, votes: q.votes + 1 } : q))
    );
  };

  const handleReply = () => {
    if (!replyText.trim() || !selectedQuestion || !user) return;

    const reply: Reply = {
      id: Date.now().toString(),
      user: user.fullName,
      text: replyText.trim(),
      createdAt: new Date().toISOString(),
    };

    setQuestions(
      questions.map((q) =>
        q.id === selectedQuestion.id
          ? { ...q, replies: [...q.replies, reply], answers: q.answers + 1 }
          : q
      )
    );
    setReplyText("");
  };

  const openQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setQuestions(
      questions.map((q) =>
        q.id === question.id ? { ...q, views: q.views + 1 } : q
      )
    );
  };

  const allTags = useMemo(() => {
    const tagMap = new Map<string, number>();
    questions.forEach((q) =>
      q.tags.forEach((t) => tagMap.set(t, (tagMap.get(t) || 0) + 1))
    );
    return Array.from(tagMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    let result = [...questions];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (q) =>
          q.title.toLowerCase().includes(query) ||
          q.tags.some((t) => t.includes(query))
      );
    }

    if (selectedTag) {
      result = result.filter((q) => q.tags.includes(selectedTag));
    }

    if (activeFilter === "recent") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (activeFilter === "unanswered") {
      result = result.filter((q) => q.answers === 0);
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      result.sort((a, b) => b.votes - a.votes);
    }

    return result;
  }, [questions, searchQuery, activeFilter, selectedTag]);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
              Study Community
            </h1>
            <p className="text-gray-600">
              Ask questions, share knowledge, and learn together
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Ask Question
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions, topics, or users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg flex items-center gap-2 text-sm text-primary"
            >
              {selectedTag}
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Questions */}
          <div className="lg:col-span-2">
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveFilter("trending")}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  activeFilter === "trending"
                    ? "bg-primary text-white"
                    : "bg-white border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Zap className="w-4 h-4" />
                Trending
              </button>
              <button
                onClick={() => setActiveFilter("recent")}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  activeFilter === "recent"
                    ? "bg-primary text-white"
                    : "bg-white border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Clock className="w-4 h-4" />
                Recent
              </button>
              <button
                onClick={() => setActiveFilter("unanswered")}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  activeFilter === "unanswered"
                    ? "bg-primary text-white"
                    : "bg-white border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Unanswered
              </button>
            </div>

            <div className="space-y-4">
              {filteredQuestions.length === 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                  <p className="text-gray-500">No questions found. Be the first to ask!</p>
                </div>
              )}
              {filteredQuestions.map((question) => (
                <div
                  key={question.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-primary/50 transition"
                >
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <button
                        onClick={() => handleVote(question.id)}
                        className="text-gray-400 hover:text-primary text-lg transition"
                        title="Upvote"
                      >
                        👍
                      </button>
                      <span className="text-sm font-semibold text-gray-600">
                        {question.votes}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3
                        onClick={() => openQuestion(question)}
                        className="font-semibold text-gray-900 mb-2 hover:text-primary cursor-pointer"
                      >
                        {question.title}
                      </h3>
                      {question.body && (
                        <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                          {question.body}
                        </p>
                      )}
                      <div className="flex gap-2 flex-wrap mb-3">
                        {question.tags.map((tag) => (
                          <span
                            key={tag}
                            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                            className={`px-2 py-1 text-xs rounded cursor-pointer transition ${
                              selectedTag === tag
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          {question.replies.length} answers · {question.user} · {timeAgo(question.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {question.views} views
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Need Quick Help */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-6 border border-primary/20 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">❓</span>
                <p className="font-semibold text-gray-900">Need Quick Help?</p>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Ask our AI assistant for instant answers to your questions.
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Ask AI Assistant
              </Button>
            </div>

            {/* Popular Tags */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Popular Tags</h3>
              <div className="space-y-2">
                {allTags.map(([name, count]) => (
                  <div
                    key={name}
                    onClick={() => setSelectedTag(selectedTag === name ? null : name)}
                    className={`p-3 rounded-lg cursor-pointer transition border ${
                      selectedTag === name
                        ? "bg-primary/10 border-primary/30"
                        : "bg-gray-50 border-gray-200 hover:border-primary/50"
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-900">{name}</p>
                    <p className="text-xs text-gray-500">{count} questions</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ask Question Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Ask a Question</DialogTitle>
            <DialogDescription>
              Share your question with the community. Add tags to help others find it.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Title</label>
              <Input
                placeholder="e.g. How does photosynthesis work?"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Details (optional)</label>
              <Textarea
                placeholder="Provide more context about your question..."
                rows={4}
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Tags ({newTags.length}/5)
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Type a tag and press Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  disabled={newTags.length >= 5}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addTag}
                  disabled={!tagInput.trim() || newTags.length >= 5}
                >
                  Add
                </Button>
              </div>
              {newTags.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-2">
                  {newTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-red-500"
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowForm(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!newTitle.trim()}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Post Question
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Question Detail Dialog */}
      <Dialog open={!!selectedQuestion} onOpenChange={() => setSelectedQuestion(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
          {selectedQuestion && (
            <>
              <DialogHeader>
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-2 -ml-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to questions
                </button>
                <DialogTitle className="text-xl pr-4">{selectedQuestion.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-3 text-xs">
                  <span>Asked by <strong className="text-foreground">{selectedQuestion.user}</strong></span>
                  <span>·</span>
                  <span>{timeAgo(selectedQuestion.createdAt)}</span>
                  <span>·</span>
                  <span>{selectedQuestion.views} views</span>
                </DialogDescription>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto space-y-5 mt-2">
                {/* Question body */}
                {selectedQuestion.body && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedQuestion.body}</p>
                  </div>
                )}

                {/* Tags */}
                <div className="flex gap-2 flex-wrap">
                  {selectedQuestion.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Replies */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    {selectedQuestion.replies.length} {selectedQuestion.replies.length === 1 ? "Answer" : "Answers"}
                  </h4>

                  {selectedQuestion.replies.length === 0 && (
                    <p className="text-sm text-gray-400 italic mb-4">No answers yet. Be the first to help!</p>
                  )}

                  <div className="space-y-3">
                    {selectedQuestion.replies.map((reply) => (
                      <div key={reply.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                            {reply.user.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{reply.user}</span>
                          <span className="text-xs text-gray-400">· {timeAgo(reply.createdAt)}</span>
                        </div>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{reply.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reply input */}
              <div className="border-t border-gray-200 pt-4 mt-2">
                <Textarea
                  placeholder={user ? "Write your answer..." : "Sign in to reply..."}
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  disabled={!user}
                />
                <div className="flex justify-end mt-2">
                  <Button
                    onClick={handleReply}
                    disabled={!replyText.trim() || !user}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post Answer
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
