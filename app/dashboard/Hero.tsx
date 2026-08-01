"use client";

import { CalendarDays, HeartHandshake } from "lucide-react";

import Avatar from "@/components/ui/Avatar";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";

interface HeroProps {
  name: string;
  photoURL?: string | null;
}

export default function Hero({
  name,
  photoURL,
}: HeroProps) {
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

  return (
    <Card className="border-none bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <SectionTitle
            title={`${greeting}, ${name} 👋`}
            subtitle="Welcome back to Aura."
            icon={<HeartHandshake size={28} />}
          />

          <div className="mt-2 flex items-center gap-2 text-purple-100">
            <CalendarDays size={18} />
            <span>{today}</span>
          </div>
        </div>

        <Avatar
          src={photoURL}
          name={name}
          size="lg"
        />
      </div>
    </Card>
  );
}