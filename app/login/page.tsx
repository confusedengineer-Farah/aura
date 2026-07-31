"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { login, googleLogin } from "@/lib/auth";
import { useAuth } from "@/providers/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, authLoading, router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      await login(email, password);

      toast.success("Welcome back 👋");

      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);

      switch (error.code) {
        case "auth/invalid-credential":
          toast.error("Invalid email or password.");
          break;

        case "auth/too-many-requests":
          toast.error("Too many attempts. Try again later.");
          break;

        default:
          toast.error("Login failed.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true);

    try {
      await googleLogin();

      toast.success("Signed in with Google 🎉");

      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);

      if (error.code !== "auth/popup-closed-by-user") {
        toast.error("Google Sign-In failed.");
      }
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-purple-400">
          Welcome Back
        </h1>

        <p className="text-center text-slate-400 mt-2">
          Login to continue your Aura journey.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full rounded-lg bg-purple-600 py-3 font-semibold hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
          className="w-full mt-4 rounded-lg border border-slate-700 py-3 hover:bg-slate-800 transition disabled:opacity-50"
        >
          {googleLoading ? "Signing in..." : "Continue with Google"}
        </button>

        <p className="mt-6 text-center text-slate-400">
          Don't have an account?{" "}
          <Link href="/signup" className="text-purple-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}