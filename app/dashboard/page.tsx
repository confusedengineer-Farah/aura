"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/providers/AuthProvider";
import FullScreenLoader from "@/components/ui/FullScreenLoader";

import Hero from "@/components/dashboard/Hero";
import DailyAffirmation from "@/components/dashboard/DailyAffirmation";
import MoodSelector from "@/components/dashboard/MoodSelector";
import MoodHistory from "@/components/dashboard/MoodHistory";
import QuickActions from "@/components/dashboard/QuickActions";
import ProfileCard from "@/components/dashboard/ProfileCard";

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

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        <Hero
          name={user.displayName || "Friend"}
          photoURL={user.photoURL}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <DailyAffirmation />

            <MoodSelector uid={user.uid} />

            <QuickActions />

            <MoodHistory uid={user.uid} />
          </div>

          <ProfileCard
            name={user.displayName}
            email={user.email}
            photoURL={user.photoURL}
          />
        </div>
      </div>
    </main>
  );
}