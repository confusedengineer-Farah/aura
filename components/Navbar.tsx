"use client"

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between px-8 py-6 border-b border-slate-800">
      <h1 className="text-3xl font-bold text-purple-400">
        Aura
      </h1>

      <div className="flex gap-4">
        <button 
          onClick={() => router.push("/login")}
          className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
          Login
        </button>

        <button
          onClick={() => router.push("/signup")}
          className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition">
          Get Started
        </button>
      </div>
    </nav>
  );
}