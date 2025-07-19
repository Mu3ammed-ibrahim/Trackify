"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabaseClients";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Link from "next/link";

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setError(error.message);
      setSuccess(false);
    } else {
      setError(null);
      toast.success("Signup successful! Check your email to confirm.");
      setSuccess(true);

      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-6">
          Create an Account ✨
        </h2>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && (
            <motion.p
              className="text-green-600 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ✅ Signup successful! Redirecting to login...
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition"
          >
            Sign Up
          </button>

          <p className="text-sm mt-2 text-center">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-green-600 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default SignUpPage;
