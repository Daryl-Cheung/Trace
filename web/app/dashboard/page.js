"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

export default function DashboardPage() {
  const { user, token, loading } = useAuth();
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;

    apiFetch(`/api/v1/subscriptions/user/${user._id}`, { token })
      .then((data) => setSubscriptions(data.data))
      .catch((err) => setError(err.message))
      .finally(() => setFetching(false));
  }, [user, token]);

  const handleCancel = async (id) => {
    try {
      await apiFetch(`/api/v1/subscriptions/${id}/cancel`, { method: "PUT", token });
      setSubscriptions((subs) =>
        subs.map((s) => (s._id === id ? { ...s, status: "cancelled" } : s))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiFetch(`/api/v1/subscriptions/${id}`, { method: "DELETE", token });
      setSubscriptions((subs) => subs.filter((s) => s._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading || !user) return null;

  return (
    <main className="flex-1 px-6 py-10 max-w-2xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your subscriptions</h1>
        <Link
          href="/dashboard/new"
          className="rounded-full bg-black text-white px-4 py-2 text-sm font-medium dark:bg-white dark:text-black"
        >
          + New
        </Link>
      </div>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      {fetching ? (
        <p className="text-black/60 dark:text-white/60">Loading...</p>
      ) : subscriptions.length === 0 ? (
        <p className="text-black/60 dark:text-white/60">No subscriptions yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {subscriptions.map((sub) => (
            <li
              key={sub._id}
              className="border border-black/10 dark:border-white/10 rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{sub.name}</p>
                <p className="text-sm text-black/60 dark:text-white/60">
                  {sub.currency} {sub.price} / {sub.frequency} · renews{" "}
                  {new Date(sub.renewalDate).toLocaleDateString()} · {sub.status}
                </p>
              </div>
              <div className="flex gap-2 text-sm">
                {sub.status === "active" && (
                  <button onClick={() => handleCancel(sub._id)} className="underline cursor-pointer">
                    Cancel
                  </button>
                )}
                <button
                  onClick={() => handleDelete(sub._id)}
                  className="underline text-red-500 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
