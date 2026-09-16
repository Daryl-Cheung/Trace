"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

const CATEGORIES = [
  "sports",
  "news",
  "entertainment",
  "lifestyle",
  "technology",
  "finance",
  "politics",
  "other",
];
const FREQUENCIES = ["daily", "weekly", "monthly", "yearly"];
// The backend's currency enum has a typo ("GRP" instead of "GBP") — the value
// sent must match the enum exactly or the API rejects it with a 400.
const CURRENCIES = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "GRP", label: "GBP" },
];

export default function NewSubscriptionPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    price: "",
    currency: "USD",
    frequency: "monthly",
    category: "entertainment",
    paymentMethod: "",
    startDate: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await apiFetch("/api/v1/subscriptions", {
        method: "POST",
        token,
        body: { ...form, price: Number(form.price) },
      });
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex-1 px-6 py-10 max-w-sm mx-auto w-full">
      <h1 className="text-2xl font-bold mb-6">New subscription</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <p className="text-sm text-red-500">{error}</p>}
        <input
          name="name"
          placeholder="Name (e.g. Netflix)"
          value={form.name}
          onChange={handleChange}
          required
          className="border rounded-lg px-3 py-2 border-black/20 dark:border-white/20 bg-transparent"
        />
        <input
          name="price"
          type="number"
          step="0.01"
          min="0"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="border rounded-lg px-3 py-2 border-black/20 dark:border-white/20 bg-transparent"
        />
        <select
          name="currency"
          value={form.currency}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 border-black/20 dark:border-white/20 bg-transparent"
        >
          {CURRENCIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <select
          name="frequency"
          value={form.frequency}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 border-black/20 dark:border-white/20 bg-transparent"
        >
          {FREQUENCIES.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 border-black/20 dark:border-white/20 bg-transparent"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          name="paymentMethod"
          placeholder="Payment method (e.g. Visa)"
          value={form.paymentMethod}
          onChange={handleChange}
          required
          className="border rounded-lg px-3 py-2 border-black/20 dark:border-white/20 bg-transparent"
        />
        <label className="text-sm text-black/60 dark:text-white/60 -mb-2">Start date</label>
        <input
          name="startDate"
          type="date"
          value={form.startDate}
          onChange={handleChange}
          required
          max={new Date().toISOString().split("T")[0]}
          className="border rounded-lg px-3 py-2 border-black/20 dark:border-white/20 bg-transparent"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-black text-white px-5 py-2.5 text-sm font-medium dark:bg-white dark:text-black disabled:opacity-50"
        >
          {submitting ? "Creating..." : "Create subscription"}
        </button>
      </form>
    </main>
  );
}
