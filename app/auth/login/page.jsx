"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabaseClients";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Mail, Lock, AlertCircle } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);
  const router = useRouter();

  useEffect(() => {
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
  }, [router]);

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

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Add the glowing orbs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-[128px] animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-300 dark:bg-indigo-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-[128px] animate-blob"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-[128px] animate-blob animation-delay-4000"></div>

      {/* Your existing content */}
      <motion.div
        className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 md:p-8 w-full max-w-md relative z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-6 md:mb-8">
          <div className="text-3xl md:text-4xl mb-4">👋</div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Sign in to your Trackify account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                    className="text-sm text-yellow-700 dark:text-yellow-300 hover:text-yellow-800 dark:hover:text-yellow-200 font-medium mt-2"
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
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3"
            >
              <p className="text-green-600 dark:text-green-400 text-sm flex items-center gap-2">
                <span>✅</span>
                Login successful! Redirecting...
              </p>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
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
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
