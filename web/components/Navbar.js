"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-black/10 dark:border-white/10">
      <Link href="/" className="font-semibold text-lg">
        Trace
      </Link>
      <div className="flex items-center gap-4 text-sm">
        {user ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button onClick={signOut} className="cursor-pointer">
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link href="/sign-in">Sign in</Link>
            <Link href="/sign-up">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
