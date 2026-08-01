"use client";

import {
  CalendarDays,
  HeartHandshake,
  LogOut,
  MessageCircle,
  ShieldAlert,
  UserRoundSearch,
  BookOpen,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { logout } from "@/lib/auth";
import { useAuth } from "@/providers/AuthProvider";

import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import FullScreenLoader from "@/components/ui/FullScreenLoader";

const moods = [
  { emoji: "😊", value: "happy" },
  { emoji: "😌", value: "calm" },
  { emoji: "😔", value: "sad" },
  { emoji: "😠", value: "angry" },
  { emoji: "😰", value: "anxious" },
];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [selectedMood, setSelectedMood] = useState<string>("");

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) return <FullScreenLoader />;

  if (!user) return null;

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

  async function selectMood(mood: string) {
    setSelectedMood(mood);

    await setDoc(
      doc(db, "users", "moods", new Date().toISOString()),
      {
        mood,
        createdAt: serverTimestamp(),
      }
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl p-6">
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

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card hover className="lg:col-span-2">
            <SectionTitle
              title="Today's Mood"
              subtitle="How are you feeling today?"
            />

            <div className="mt-6 flex flex-wrap gap-4">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => selectMood(mood.value)}
                  className={`text-5xl transition-all duration-200 hover:scale-110 ${
                    selectedMood === mood.value
                      ? "scale-125"
                      : "opacity-70"
                  }`}
                >
                  {mood.emoji}
                </button>
              ))}
            </div>

            {selectedMood && (
              <p className="mt-6 text-purple-400 font-medium">
                Mood saved: {selectedMood}
              </p>
            )}
          </Card>

          <Card className="lg:col-span-2">
            <SectionTitle
                title="Quick Actions"
                subtitle="Choose what you'd like to do."
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <Button
                variant="secondary"
                onClick={() => router.push("/mentor")}
                >
                <div className="flex items-center justify-center gap-2">
                    <UserRoundSearch size={18} />
                    Find Mentor
                </div>
                </Button>

                <Button
                variant="secondary"
                onClick={() => router.push("/chat")}
                >
                <div className="flex items-center justify-center gap-2">
                    <MessageCircle size={18} />
                    Open Chat
                </div>
                </Button>

                <Button
                variant="secondary"
                onClick={() => router.push("/journal")}
                >
                <div className="flex items-center justify-center gap-2">
                    <BookOpen size={18} />
                    Journal
                </div>
                </Button>

                <Button
                variant="danger"
                onClick={() => router.push("/sos")}
                >
                <div className="flex items-center justify-center gap-2">
                    <ShieldAlert size={18} />
                    Emergency SOS
                </div>
                </Button>

            </div>
          </Card>

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