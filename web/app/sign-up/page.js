"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function SignUpPage() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      await signUp(form);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Create your account</h1>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border rounded-lg px-3 py-2 border-black/20 dark:border-white/20 bg-transparent"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border rounded-lg px-3 py-2 border-black/20 dark:border-white/20 bg-transparent"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          minLength={6}
          className="border rounded-lg px-3 py-2 border-black/20 dark:border-white/20 bg-transparent"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-black text-white px-5 py-2.5 text-sm font-medium dark:bg-white dark:text-black disabled:opacity-50"
        >
          {submitting ? "Creating account..." : "Sign up"}
        </button>
        <p className="text-sm text-black/60 dark:text-white/60">
          Already have an account?{" "}
          <Link href="/sign-in" className="underline">
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}
