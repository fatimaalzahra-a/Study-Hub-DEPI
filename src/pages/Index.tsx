import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Brain,
  CheckCircle,
  MessageCircle,
  Users,
  Zap,
  ArrowRight,
  Upload,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg">Mnemora</span>
            <span className="text-xs text-gray-500">AI Study Hub</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#benefits" className="text-gray-600 hover:text-gray-900">
              Why Us
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900">
              Testimonials
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/sign-in"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Sign In
            </Link>
            <Link to="/dashboard">
              <Button className="bg-primary hover:bg-primary/90 text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Study Platform
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Study Smarter, Not Harder
          </h1>

          <p className="text-3xl md:text-4xl font-semibold text-primary mb-6">
            With AI-Powered Learning
          </p>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Upload your PDFs, get instant summaries, ask questions, and collaborate with
            peers. Transform the way you study with Mnemora.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg">
                Start Studying Free <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                variant="outline"
                className="px-6 py-2 rounded-lg"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload PDF
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Everything You Need to Excel
            </h2>
            <p className="text-gray-600">
              Powerful features designed for modern learners
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Smart PDF Upload
              </h3>
              <p className="text-gray-600">
                Instantly upload any study material and let AI analyze and organize it
                for you.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI-Powered Summaries
              </h3>
              <p className="text-gray-600">
                Get concise, intelligent summaries of complex topics in seconds.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Interactive Q&A
              </h3>
              <p className="text-gray-600">
                Ask questions and get instant answers from your study materials.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Study Community
              </h3>
              <p className="text-gray-600">
                Connect with peers, share insights, and learn together in real-time.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Smart Notes
              </h3>
              <p className="text-gray-600">
                Take organized notes with highlights, bookmarks, and AI suggestions.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Study Planner
              </h3>
              <p className="text-gray-600">
                Track your progress and stay on schedule with intelligent planning
                tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Students Love Mnemora
              </h2>

              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Save 60% of your study time
                    </p>
                    <p className="text-gray-600 text-sm">
                      with AI-generated summaries
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Never miss important concepts
                    </p>
                    <p className="text-gray-600 text-sm">
                      with smart highlighting
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Get instant answers to complex questions
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Stay organized
                    </p>
                    <p className="text-gray-600 text-sm">
                      with integrated study planning
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Collaborate with classmates
                    </p>
                    <p className="text-gray-600 text-sm">
                      in real-time
                    </p>
                  </div>
                </li>
              </ul>

              <Link to="/dashboard">
                <Button className="bg-primary hover:bg-primary/90 mt-8">
                  Try it Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">AI Assistant</p>
                  <p className="text-xs text-gray-500">Ready to help</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-primary/5 rounded-lg p-3">
                  <p className="text-gray-600 text-sm">
                    Can you summarize chapter 5?
                  </p>
                </div>

                <div className="bg-primary/10 rounded-lg p-3">
                  <p className="text-gray-900 text-sm">
                    Chapter 5 covers photosynthesis, the process by which plants convert
                    light energy into chemical energy...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Loved by Students Worldwide
            </h2>
            <p className="text-gray-600">Join thousands of successful learners</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-50 rounded-xl">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Mnemora saved me hours of study time. The summaries are incredible."
              </p>
              <div>
                <p className="font-semibold text-gray-900">Sarah Chen</p>
                <p className="text-sm text-gray-600">Computer Science Student</p>
              </div>
            </div>

            <div className="p-8 bg-gray-50 rounded-xl">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "The feature is incredibly accurate and helpful."
              </p>
              <div>
                <p className="font-semibold text-gray-900">Marcus Johnson</p>
                <p className="text-sm text-gray-600">Medical Student</p>
              </div>
            </div>

            <div className="p-8 bg-gray-50 rounded-xl">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "It's like having a personal tutor 24/7."
              </p>
              <div>
                <p className="font-semibold text-gray-900">Emily Rodriguez</p>
                <p className="text-sm text-gray-600">Law Student</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Study Experience?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Join Mnemora today and start studying smarter with AI
          </p>
          <Link to="/dashboard">
            <Button className="bg-white text-primary hover:bg-gray-100 text-base px-8 py-6 h-auto">
              Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-white">Mnemora</span>
              </div>
              <p className="text-sm">Empowering students with AI-powered learning.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <Link to="/upgrade" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2024 Mnemora. Empowering students with AI-powered learning.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
