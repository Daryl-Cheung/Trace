import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-bold">Never miss a renewal again</h1>
      <p className="max-w-md text-black/60 dark:text-white/60">
        Trace tracks your subscriptions and emails you before they renew.
      </p>
      <div className="flex gap-4">
        <Link
          href="/sign-up"
          className="rounded-full bg-black text-white px-5 py-2.5 text-sm font-medium dark:bg-white dark:text-black"
        >
          Get started
        </Link>
        <Link
          href="/sign-in"
          className="rounded-full border border-black/20 px-5 py-2.5 text-sm font-medium dark:border-white/20"
        >
          Sign in
        </Link>
      </div>
    </main>
  );
}
