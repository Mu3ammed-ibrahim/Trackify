"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabaseClients";
import Dashboard from "@/app/dashboard/page";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession();

        if (!currentSession) {
          router.push("/auth/login");
          return;
        }

        setSession(currentSession);
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          router.push("/auth/login");
        } else if (session) {
          setSession(session);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return session ? <Dashboard /> : null;
}
