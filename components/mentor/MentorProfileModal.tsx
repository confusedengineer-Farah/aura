"use client";

import { X, Star, GraduationCap, Mail, Clock } from "lucide-react";

import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

import { Mentor } from "@/types/mentor";

interface MentorProfileModalProps {
  mentor: Mentor | null;
  open: boolean;
  onClose: () => void;
  onRequest: (mentor: Mentor) => void;
}

export default function MentorProfileModal({
  mentor,
  open,
  onClose,
  onRequest,
}: MentorProfileModalProps) {
  if (!open || !mentor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 p-8 shadow-2xl">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center">

          <Avatar
            src={mentor.photoURL}
            name={mentor.name}
            size="lg"
          />

          <h2 className="mt-4 text-3xl font-bold">
            {mentor.name}
          </h2>

          <p className="mt-1 text-slate-400">
            {mentor.email}
          </p>

          <Badge
            className="mt-4"
            variant={mentor.isAvailable ? "success" : "danger"}
          >
            {mentor.isAvailable ? "Available" : "Offline"}
          </Badge>

        </div>

        <div className="mt-8 space-y-5">

          <div className="flex items-center gap-3">
            <GraduationCap size={20} />
            <span>{mentor.college}</span>
          </div>

          <div className="flex items-center gap-3">
            <Star
              size={20}
              className="text-yellow-400"
            />
            <span>{mentor.rating} / 5</span>
          </div>

          <div className="flex items-center gap-3">
            <Clock size={20} />
            <span>{mentor.totalSessions} Sessions</span>
          </div>

          <div className="flex items-center gap-3">
            <Mail size={20} />
            <span>{mentor.email}</span>
          </div>

          <div>
            <Badge>{mentor.specialization}</Badge>
          </div>

          <p className="leading-8 text-slate-300">
            {mentor.bio}
          </p>

          <Button
            disabled={!mentor.isAvailable}
            onClick={() => onRequest(mentor)}
          >
            Request Mentor
          </Button>

        </div>

      </div>
    </div>
  );
}