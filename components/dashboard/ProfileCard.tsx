"use client";

import { useRouter } from "next/navigation";
import { LogOut, Mail } from "lucide-react";
import toast from "react-hot-toast";

import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";

import { logout } from "@/lib/auth";

interface ProfileCardProps {
  name?: string | null;
  email?: string | null;
  photoURL?: string | null;
}

export default function ProfileCard({
  name,
  email,
  photoURL,
}: ProfileCardProps) {
  const router = useRouter();

  async function handleLogout() {
    try {
      await logout();

      toast.success("Logged out successfully 👋");

      router.replace("/login");
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout.");
    }
  }

  return (
    <Card>
      <SectionTitle
        title="Profile"
        subtitle="Your Aura account"
      />

      <div className="mt-6 flex flex-col items-center">
        <Avatar
          src={photoURL}
          name={name}
          size="lg"
        />

        <h3 className="mt-4 text-xl font-semibold text-white">
          {name || "Aura User"}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-slate-400">
          <Mail size={16} />
          <span className="text-sm">{email}</span>
        </div>

        <Button
          variant="danger"
          className="mt-8"
          onClick={handleLogout}
        >
          <div className="flex items-center justify-center gap-2">
            <LogOut size={18} />
            Logout
          </div>
        </Button>
      </div>
    </Card>
  );
}