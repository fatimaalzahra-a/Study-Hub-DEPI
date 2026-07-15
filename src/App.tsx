import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import DocumentViewer from "./pages/DocumentViewer";
import StudyGroups from "./pages/StudyGroups";
import MyChats from "./pages/MyChats";
import Community from "./pages/Community";
import Planner from "./pages/Planner";
import FocusMode from "./pages/FocusMode";
import StudyMusic from "./pages/StudyMusic";
import Upgrade from "./pages/Upgrade";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="*" element={<NotFound />} />

                {/* Protected routes */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/document/:id" element={<ProtectedRoute><DocumentViewer /></ProtectedRoute>} />
                <Route path="/study-groups" element={<ProtectedRoute><StudyGroups /></ProtectedRoute>} />
                <Route path="/my-chats" element={<ProtectedRoute><MyChats /></ProtectedRoute>} />
                <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
                <Route path="/planner" element={<ProtectedRoute><Planner /></ProtectedRoute>} />
                <Route path="/focus-mode" element={<ProtectedRoute><FocusMode /></ProtectedRoute>} />
                <Route path="/study-music" element={<ProtectedRoute><StudyMusic /></ProtectedRoute>} />
                <Route path="/upgrade" element={<ProtectedRoute><Upgrade /></ProtectedRoute>} />
                <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
