import { Button } from "@/components/ui/button";
import { Brain, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/components/AuthProvider";

const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Name must be at least 2 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    university: z
      .string()
      .min(1, "University is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
    agreeToTerms: z.literal(true, {
      errorMap: () => ({ message: "You must agree to the Terms of Service" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSignUp = (data: SignUpFormData) => {
    setAuthError("");
    try {
      signup({
        fullName: data.fullName,
        email: data.email,
        university: data.university,
        password: data.password,
      });
      navigate("/dashboard");
    } catch (err: any) {
      setAuthError(err.message || "Sign up failed");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Mnemora</p>
            <p className="text-xs text-gray-500">AI Study Hub</p>
          </div>
        </Link>

        {/* Sign Up Form Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            Create your account 🚀
          </h1>
          <p className="text-gray-600">Start studying smarter today</p>
        </div>

        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="John Doe"
                {...register("fullName")}
                className={`w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  errors.fullName ? "border-red-500" : "border-gray-200"
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="your.email@university.edu"
                {...register("email")}
                className={`w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* University/Institution */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              University/Institution
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 1 10.289 1 15.5c0 5.212 5.5 9.25 11 9.25s11-4.038 11-9.25c0-5.211-5.5-9.247-11-9.247z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Harvard University"
                {...register("university")}
                className={`w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  errors.university ? "border-red-500" : "border-gray-200"
                }`}
              />
            </div>
            {errors.university && (
              <p className="text-red-500 text-xs mt-1">{errors.university.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                {...register("password")}
                className={`w-full pl-10 pr-10 py-2 bg-gray-50 border rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  errors.password ? "border-red-500" : "border-gray-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                {...register("confirmPassword")}
                className={`w-full pl-10 pr-10 py-2 bg-gray-50 border rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Terms Agreement */}
          <div>
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                {...register("agreeToTerms")}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mt-1"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-xs mt-1 ml-6">{errors.agreeToTerms.message}</p>
            )}
          </div>

          {/* Auth Error */}
          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{authError}</p>
            </div>
          )}

          {/* Sign Up Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2"
          >
            Create Account
          </Button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
