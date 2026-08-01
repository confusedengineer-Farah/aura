"use client";

import { useRouter } from "next/navigation";
import {
  BookOpen,
  MessageCircle,
  ShieldAlert,
  UserRoundSearch,
} from "lucide-react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";

export default function QuickActions() {
  const router = useRouter();

  return (
    <Card>
      <SectionTitle
        title="Quick Actions"
        subtitle="Get help instantly."
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
  );
}