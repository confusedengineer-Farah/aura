"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Flame } from "lucide-react";

import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { db } from "@/lib/firebase";
import {
  calculateMoodStreak,
  MoodEntry,
} from "@/lib/streak";

interface MoodStreakProps {
  uid: string;
}

export default function MoodStreak({
  uid,
}: MoodStreakProps) {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const q = query(
      collection(db, "users", uid, "moods"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const moods = snapshot.docs.map(
        (doc) => doc.data() as MoodEntry
      );

      setStreak(calculateMoodStreak(moods));
    });

    return unsubscribe;
  }, [uid]);

  function getMessage() {
    if (streak === 0)
      return "Start your first mood check-in today 🌱";

    if (streak <= 3)
      return "Great start! Keep checking in 💜";

    if (streak <= 7)
      return "You're building a healthy habit 🔥";

    if (streak <= 30)
      return "Amazing consistency! Keep it up 🚀";

    return "Incredible dedication! You're inspiring 🌟";
  }

  return (
    <Card>
      <SectionTitle
        title="Mood Streak"
        subtitle="Consistency builds healthy habits."
        icon={<Flame className="text-orange-500" size={24} />}
      />

      <div className="mt-6 flex flex-col items-center justify-center">
        <div className="rounded-full bg-orange-500/20 p-6">
          <Flame
            size={48}
            className="text-orange-500"
          />
        </div>

        <h2 className="mt-5 text-5xl font-bold text-white">
          {streak}
        </h2>

        <p className="mt-2 text-lg text-slate-300">
          {streak === 1 ? "Day" : "Days"} Streak
        </p>

        <p className="mt-4 max-w-sm text-center text-slate-400">
          {getMessage()}
        </p>
      </div>
    </Card>
  );
}