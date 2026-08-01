"use client";

import { useEffect, useState } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Clock3 } from "lucide-react";

import { db } from "@/lib/firebase";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import SectionTitle from "@/components/ui/SectionTitle";

interface MoodHistoryProps {
  uid: string;
}

interface Mood {
  id: string;
  mood: string;
  createdAt?: {
    toDate: () => Date;
  };
}

const moodEmoji: Record<string, string> = {
  happy: "😊",
  calm: "😌",
  sad: "😔",
  angry: "😠",
  anxious: "😰",
};

export default function MoodHistory({
  uid,
}: MoodHistoryProps) {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "users", uid, "moods"),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Mood[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Mood, "id">),
      }));

      setMoods(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [uid]);

  return (
    <Card>
      <SectionTitle
        title="Recent Mood History"
        subtitle="Your last 5 mood check-ins"
      />

      {loading ? (
        <p className="mt-6 text-center text-slate-400">
          Loading mood history...
        </p>
      ) : moods.length === 0 ? (
        <EmptyState
          title="No mood history"
          description="Start by selecting your mood above."
        />
      ) : (
        <div className="mt-6 space-y-4">
          {moods.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl bg-slate-800 p-4"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">
                  {moodEmoji[item.mood] ?? "🙂"}
                </span>

                <div>
                  <p className="font-medium capitalize">
                    {item.mood}
                  </p>

                  <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                    <Clock3 size={14} />

                    <span>
                      {item.createdAt
                        ? item.createdAt
                            .toDate()
                            .toLocaleString()
                        : "Just now"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}