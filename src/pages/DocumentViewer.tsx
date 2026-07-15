import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Share2,
  Download,
  MoreVertical,
  Highlighter,
  Bookmark,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  BookOpen,
  FileText,
  Send,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DocumentViewer() {
  const [activeTab, setActiveTab] = useState<"chat" | "notes" | "summary">(
    "chat"
  );
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [chatMessage, setChatMessage] = useState("");
  const [isReading, setIsReading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const totalPages = 45;

  const documentText = `Introduction to Quantum Physics. Quantum physics, also known as quantum mechanics, is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum technology, and quantum information science. Classical physics, the description of physics that existed before the theory of relativity and quantum mechanics explains the aspects of nature at an ordinary macroscopic scale, while quantum mechanics explains the aspects of nature at small atomic and subatomic scales.`;

  const handleReadAloud = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsReading(false);
      return;
    }

    setIsReading(true);
    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(documentText);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsReading(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <DashboardLayout>
      <div className="flex h-screen flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="hover:bg-gray-100 p-2 rounded">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-lg">
                  📚
                </div>
                <div>
                  <h1 className="font-semibold text-gray-900">
                    Introduction to Quantum Physics
                  </h1>
                  <p className="text-xs text-gray-500">Physics • 45 pages • Last edited 2 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* PDF Viewer */}
          <div className="flex-1 flex flex-col bg-gray-100 border-r border-gray-200">
            {/* Toolbar */}
            <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded">
                  <Highlighter className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <Bookmark className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={handleReadAloud}
                  className={`p-2 rounded transition ${
                    isSpeaking
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                  title={isSpeaking ? "Stop reading" : "Read aloud"}
                >
                  {isSpeaking ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>

              <div className="flex-1 flex items-center gap-2 ml-auto">
                <button
                  onClick={() => setZoom(Math.max(zoom - 10, 50))}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <ZoomOut className="w-4 h-4 text-gray-600" />
                </button>
                <span className="text-sm text-gray-600 w-12 text-center">
                  {zoom}%
                </span>
                <button
                  onClick={() => setZoom(Math.min(zoom + 10, 200))}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <ZoomIn className="w-4 h-4 text-gray-600" />
                </button>

                <div className="border-l border-gray-200 pl-4 ml-4 flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(currentPage + 1, totalPages))
                    }
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Document Content */}
            <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
              <div
                className="bg-white shadow-lg"
                style={{ width: `${zoom}%`, maxWidth: "900px" }}
              >
                <div className="p-12 min-h-96">
                  <div className="mb-6">
                    <p className="text-sm text-blue-600 font-medium mb-2">
                      Chapter 1
                    </p>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Introduction to Quantum Physics
                    </h2>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-4">
                    Quantum physics, also known as quantum mechanics, is a
                    fundamental theory in physics that provides a description
                    of the physical properties of nature at the scale of atoms
                    and subatomic particles. It is the foundation of all quantum
                    physics including quantum chemistry, quantum technology, and
                    quantum information science.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    Classical physics, the description of physics that existed
                    before the theory of relativity and quantum mechanics
                    explains the aspects of nature at an ordinary (macroscopic)
                    scale, while quantum mechanics explains the aspects of
                    nature at small (atomic and subatomic) scales.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                        ✓
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Key Concept
                        </p>
                        <p className="text-gray-700 text-sm mt-1">
                          Wave-particle duality is one of the central concepts
                          in quantum mechanics, demonstrating that all matter
                          exhibits both wave and particle properties.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition ${
                  activeTab === "chat"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <MessageCircle className="w-4 h-4 inline mr-2" />
                Chat
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition ${
                  activeTab === "notes"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Notes
              </button>
              <button
                onClick={() => setActiveTab("summary")}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition ${
                  activeTab === "summary"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                Summary
              </button>
            </div>

            {/* Chat Tab */}
            {activeTab === "chat" && (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* AI Message */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white flex-shrink-0">
                      🤖
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-600 mb-1">
                        AI Assistant
                      </p>
                      <div className="bg-primary/10 rounded-lg p-3">
                        <p className="text-sm text-gray-800">
                          Hello! I've analyzed this document. Feel free to ask me
                          any questions about the content.
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Just now</p>
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex gap-3 justify-end">
                    <div className="bg-primary text-white rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Can you explain the concept of wave-particle duality?</p>
                    </div>
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white flex-shrink-0 text-sm">
                      JD
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white flex-shrink-0">
                      🤖
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-600 mb-1">
                        AI Assistant
                      </p>
                      <div className="bg-primary/10 rounded-lg p-3">
                        <p className="text-sm text-gray-800">
                          Wave-particle duality is a fundamental concept in
                          quantum mechanics. It states that every particle or
                          quantum entity may be described as either a particle
                          or a wave.
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="border-t border-gray-200 p-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ask me anything..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notes Tab */}
            {activeTab === "notes" && (
              <div className="flex-1 flex flex-col p-4">
                <textarea
                  placeholder="Add your notes here..."
                  className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
                <Button className="bg-primary hover:bg-primary/90 mt-4 w-full">
                  Save Notes
                </Button>
              </div>
            )}

            {/* Summary Tab */}
            {activeTab === "summary" && (
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Chapter Summary
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      This chapter introduces the fundamental concepts of
                      quantum physics. It explains how quantum mechanics differs
                      from classical physics and introduces key concepts like
                      wave-particle duality.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Key Points
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>
                        • Quantum mechanics describes nature at atomic and
                        subatomic scales
                      </li>
                      <li>
                        • Classical physics fails to explain phenomena at small
                        scales
                      </li>
                      <li>
                        • Wave-particle duality is fundamental to quantum theory
                      </li>
                      <li>• Quantum systems behave probabilistically</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Vocabulary
                    </h4>
                    <div className="space-y-2">
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs font-medium text-gray-900">
                          Quantum Mechanics
                        </p>
                        <p className="text-xs text-gray-600">
                          Theory describing nature at atomic scale
                        </p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs font-medium text-gray-900">
                          Duality
                        </p>
                        <p className="text-xs text-gray-600">
                          Quality of having two aspects or forms
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
