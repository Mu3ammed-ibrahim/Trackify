"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/app/lib/supabaseClients";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

// Import reusable components
import WelcomeMessage from "@/app/components/WelcomeMessage";
import StatsCards from "@/app/components/StatsCards";
import PieChartComponent from "@/app/components/PieChartComponent";
import RecentTransactions from "@/app/components/RecentTransactions";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ErrorDisplay from "@/app/components/ErrorDisplay";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserAndTransactions = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get current user
        const {
          data: { user: currentUser },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (!currentUser) {
          setError("No user found. Please log in.");
          return;
        }

        setUser(currentUser);

        // Fetch transactions for the current user
        const { data, error } = await supabase
          .from("transactions")
          .select("id, amount, category, description, created_at")
          .eq("user_id", currentUser.id)
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setTransactions(data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to fetch transactions");
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndTransactions();
  }, []);

  const { totalIncome, totalExpense, balance, pieData } = useMemo(() => {
    const income = transactions.filter((t) => t.category === "income");
    const expense = transactions.filter((t) => t.category === "expense");

    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = expense.reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpense;

    const pieData = [
      { name: "Income", value: totalIncome },
      { name: "Expense", value: totalExpense },
    ];

    return { totalIncome, totalExpense, balance, pieData };
  }, [transactions]);

  if (loading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  if (error) {
    return (
      <ErrorDisplay error={error} onRetry={() => window.location.reload()} />
    );
  }

  return (
    <section className="space-y-6 md:space-y-8">
      {/* Welcome Message */}
      <WelcomeMessage />

      {/* Stats Cards */}
      <StatsCards
        stats={{
          balance,
          totalIncome,
          totalExpense,
        }}
      />

      {/* Pie Chart */}
      <PieChartComponent data={pieData} />

      {/* Recent Transactions */}
      <RecentTransactions transactions={transactions} maxItems={5} />
    </section>
  );
}
