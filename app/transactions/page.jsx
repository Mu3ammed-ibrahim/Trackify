"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClients";
import { motion } from "framer-motion";
import {
  Loader2,
  Plus,
  Trash2,
  DollarSign,
  Calendar,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "expense",
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchUserAndTransactions();
  }, []);

  const fetchUserAndTransactions = async () => {
    try {
      setFetching(true);
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
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.description.trim()) {
      toast.error("Please enter a description");
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      setIsAdding(true);

      const { error } = await supabase.from("transactions").insert({
        description: formData.description.trim(),
        amount: parseFloat(formData.amount),
        category: formData.category,
        user_id: user.id,
      });

      if (error) {
        throw error;
      }

      toast.success("Transaction added successfully!");
      setFormData({ description: "", amount: "", category: "expense" });
      fetchUserAndTransactions(); // Refresh the list
    } catch (err) {
      console.error("Error adding transaction:", err);
      toast.error(err.message || "Failed to add transaction");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this transaction?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      toast.success("Transaction deleted successfully!");
      fetchUserAndTransactions(); // Refresh the list
    } catch (err) {
      console.error("Error deleting transaction:", err);
      toast.error(err.message || "Failed to delete transaction");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading transactions...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-6xl">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Error Loading Transactions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6 md:space-y-8">
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Manage Transactions
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Add and track your income and expenses
        </p>
      </motion.div>

      {/* Add Transaction Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white">
          Add New Transaction
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter description"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  disabled={isAdding}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  required
                  disabled={isAdding}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                disabled={isAdding}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isAdding}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isAdding ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Add Transaction
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Transactions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm"
      >
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            All Transactions
          </h2>
          {fetching && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              Refreshing...
            </div>
          )}
        </div>

        {transactions.length > 0 ? (
          <div className="space-y-2 md:space-y-3">
            {transactions.map(
              ({ id, description, amount, category, created_at }) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-between items-center p-3 md:p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white text-sm md:text-base truncate">
                      {description || "No description"}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      {new Date(created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-semibold text-sm md:text-base ${
                        category === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {category === "income" ? "+" : "-"}${amount.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleDelete(id)}
                      className="p-1 md:p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      aria-label="Delete transaction"
                    >
                      <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </motion.div>
              )
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No transactions yet. Start by adding your first transaction!</p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
