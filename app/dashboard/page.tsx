"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, HeartHandshake, LogOut } from "lucide-react";

import { useAuth } from "@/providers/AuthProvider";
import { logout } from "@/lib/auth";

import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import FullScreenLoader from "@/components/ui/FullScreenLoader";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return <FullScreenLoader />;
  }

  if (!user) {
    return null;
  }

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl p-6">

        {/* Hero */}

        <Card className="bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 border-none">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>
              <SectionTitle
                title={`${greeting}, ${user.displayName || "Friend"} 👋`}
                subtitle="Welcome back to Aura."
                icon={<HeartHandshake size={28} />}
              />

              <div className="mt-2 flex items-center gap-2 text-purple-100">
                <CalendarDays size={18} />
                <span>{today}</span>
              </div>
            </div>

            <Avatar
              src={user.photoURL}
              name={user.displayName}
              size="lg"
            />

          </div>
        </Card>

        {/* Dashboard Grid */}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Mood */}

          <Card hover className="lg:col-span-2">
            <SectionTitle
              title="Today's Mood"
              subtitle="How are you feeling today?"
            />

            <div className="mt-6 flex flex-wrap gap-4 text-4xl">

              <button className="transition hover:scale-110">
                😊
              </button>

              <button className="transition hover:scale-110">
                😌
              </button>

              <button className="transition hover:scale-110">
                😔
              </button>

              <button className="transition hover:scale-110">
                😠
              </button>

              <button className="transition hover:scale-110">
                😰
              </button>

            </div>
          </Card>

          {/* Profile */}

          <Card>
            <SectionTitle
              title="Profile"
              subtitle="Your Aura account"
            />

            <div className="mt-6 flex flex-col items-center">

              <Avatar
                src={user.photoURL}
                name={user.displayName}
                size="lg"
              />

              <h3 className="mt-4 text-xl font-semibold">
                {user.displayName || "Aura User"}
              </h3>

              <p className="text-slate-400">
                {user.email}
              </p>

              <Button
                variant="danger"
                className="mt-6"
                onClick={handleLogout}
              >
                <div className="flex items-center justify-center gap-2">
                  <LogOut size={18} />
                  Logout
                </div>
              </Button>

            </div>
          </Card>

        </div>

      </div>
    </main>
  );
}