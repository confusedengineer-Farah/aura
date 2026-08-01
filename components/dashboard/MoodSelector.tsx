"use client";

import { useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

import { db } from "@/lib/firebase";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";

interface MoodSelectorProps {
  uid: string;
}

const moods = [
  { emoji: "😊", value: "happy", label: "Happy" },
  { emoji: "😌", value: "calm", label: "Calm" },
  { emoji: "😔", value: "sad", label: "Sad" },
  { emoji: "😠", value: "angry", label: "Angry" },
  { emoji: "😰", value: "anxious", label: "Anxious" },
];

export default function MoodSelector({
  uid,
}: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState("");

  async function handleMoodSelect(mood: string) {
    try {
      setSelectedMood(mood);

      await setDoc(
        doc(db, "users", uid, "moods", new Date().toISOString()),
        {
          mood,
          createdAt: serverTimestamp(),
        }
      );

      toast.success(`Feeling ${mood} today 💜`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save mood.");
    }
  }

  return (
    <Card hover>
      <SectionTitle
        title="Today's Mood"
        subtitle="How are you feeling today?"
      />

      <div className="mt-6 flex flex-wrap justify-center gap-5">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => handleMoodSelect(mood.value)}
            className={`flex flex-col items-center rounded-xl p-3 transition-all duration-200 hover:scale-110 ${
              selectedMood === mood.value
                ? "bg-purple-600/20 ring-2 ring-purple-500 scale-110"
                : "hover:bg-slate-800"
            }`}
          >
            <span className="text-5xl">{mood.emoji}</span>

            <span className="mt-2 text-sm text-slate-300">
              {mood.label}
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}