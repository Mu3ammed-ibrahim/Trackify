"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { supabase } from "@/app/lib/supabaseClients";
import toast from "react-hot-toast";

// Components
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
  const toastShown = useRef(false);

  useEffect(() => {
    const fetchUserAndTransactions = async () => {
      try {
        setLoading(true);
        setError(null);

        const {
          data: { user: currentUser },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !currentUser) {
          throw new Error("User not found. Please log in.");
        }

        const { data, error: fetchError } = await supabase
          .from("transactions")
          .select("id, amount, category, description, created_at")
          .eq("user_id", currentUser.id)
          .order("created_at", { ascending: false });

        if (fetchError) throw fetchError;

        setTransactions(data || []);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(err.message || "Failed to fetch data");
        if (!toastShown.current) {
          toast.error("Failed to load dashboard data");
          toastShown.current = true;
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndTransactions();
  }, []);

  const { totalIncome, totalExpense, balance, pieData } = useMemo(() => {
    const income = [];
    const expense = [];

    for (const t of transactions) {
      if (t.category === "income") income.push(t);
      else if (t.category === "expense") expense.push(t);
    }

    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = expense.reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpense;

    return {
      totalIncome,
      totalExpense,
      balance,
      pieData: [
        { name: "Income", value: totalIncome },
        { name: "Expense", value: totalExpense },
      ],
    };
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
      <WelcomeMessage />

      <StatsCards
        stats={{
          balance,
          totalIncome,
          totalExpense,
        }}
      />

      <PieChartComponent data={pieData} />

      <RecentTransactions transactions={transactions} maxItems={5} />
    </section>
  );
}
