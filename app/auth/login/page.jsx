"use client";
import { motion } from "framer-motion";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabaseClients";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Mail, Lock, AlertCircle } from "lucide-react";

// Dynamically import motion components with no SSR and loading fallback
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  {
    ssr: false,
    loading: () => (
      <div className="bg-gray-100 rounded-lg animate-pulse dark:bg-gray-800"></div>
    ),
  }
);

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Use useEffect for client-side only code
  useEffect(() => {
    setMounted(true);
    // Preload Framer Motion
    const preloadFramerMotion = async () => {
      await import("framer-motion");
    };
    preloadFramerMotion();
    return () => setMounted(false);
  }, []);

  // Handle auth state changes
  useEffect(() => {
    if (!mounted) return;

    const checkLoggedIn = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Auth check error:", error);
      }
    };

    checkLoggedIn();
  }, [router, mounted]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setEmailNotConfirmed(false);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message === "Email not confirmed") {
          setEmailNotConfirmed(true);
          setError(
            "Please check your email and click the confirmation link before signing in."
          );
          toast.error("Email not confirmed. Please check your inbox.");
        } else if (error.message === "Invalid login credentials") {
          setError("Invalid email or password. Please try again.");
          toast.error("Invalid credentials");
        } else {
          setError(error.message);
          toast.error(error.message || "Login failed");
        }
        return;
      }

      setSuccess(true);
      toast.success("Login successful!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed");
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!email) {
      toast.error("Please enter your email address first");
      return;
    }

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
      });

      if (error) {
        toast.error("Failed to resend confirmation email");
        console.error("Resend error:", error);
      } else {
        toast.success("Confirmation email sent! Please check your inbox.");
        setEmailNotConfirmed(false);
        setError(null);
      }
    } catch (err) {
      toast.error("Failed to resend confirmation email");
      console.error("Resend error:", err);
    }
  };

  // Show loading state until component is mounted and initial auth check is complete
  if (!mounted || loading) {
    return (
      <div className="relative flex items-center justify-center min-h-screen px-4 py-8 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="relative z-10 w-full max-w-md p-6 shadow-2xl bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl md:p-8">
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Loading...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MotionDiv
      className="relative flex items-center justify-center min-h-screen px-4 py-8 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Add the glowing orbs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-[128px] animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-300 dark:bg-indigo-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-[128px] animate-blob"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-[128px] animate-blob animation-delay-4000"></div>

      {/* Your existing content */}
      <MotionDiv
        className="relative z-10 w-full max-w-md p-6 shadow-2xl bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl md:p-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6 text-center md:mb-8">
          <div className="mb-4 text-3xl md:text-4xl">👋</div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-600 md:text-base dark:text-gray-400">
            Sign in to your Trackify account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full py-3 pl-10 pr-4 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white md:text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full py-3 pl-10 pr-12 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white md:text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-lg p-3 flex items-start gap-3 ${
                emailNotConfirmed
                  ? "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
                  : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
              }`}
            >
              <AlertCircle
                className={`w-5 h-5 mt-0.5 ${
                  emailNotConfirmed
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              />
              <div className="flex-1">
                <p
                  className={`text-sm ${
                    emailNotConfirmed
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {error}
                </p>
                {emailNotConfirmed && (
                  <button
                    type="button"
                    onClick={handleResendConfirmation}
                    className="mt-2 text-sm font-medium text-yellow-700 dark:text-yellow-300 hover:text-yellow-800 dark:hover:text-yellow-200"
                  >
                    Resend confirmation email
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 border border-green-200 rounded-lg bg-green-50 dark:bg-green-900/20 dark:border-green-800"
            >
              <p className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <span>✅</span>
                Login successful! Redirecting...
              </p>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full gap-2 py-3 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 md:text-base"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-medium text-indigo-600 transition-colors dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </MotionDiv>
    </MotionDiv>
  );
};

export default LoginPage;
