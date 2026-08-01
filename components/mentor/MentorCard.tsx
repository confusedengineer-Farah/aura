"use client";

import { Star, GraduationCap, Clock } from "lucide-react";

import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import { Mentor } from "@/types/mentor";

interface MentorCardProps {
  mentor: Mentor;
  onRequest: (mentor: Mentor) => void;
  onViewProfile: (mentor: Mentor) => void;
}

export default function MentorCard({
  mentor,
  onRequest,
  onViewProfile,
}: MentorCardProps) {
  return (
    <Card
      hover
      className="flex cursor-pointer flex-col justify-between"
      onClick={() => onViewProfile(mentor)}
    >
      <div>
        <div className="flex items-center gap-4">
          <Avatar
            src={mentor.photoURL}
            name={mentor.name}
            size="lg"
          />

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white">
              {mentor.name}
            </h2>

            <p className="text-sm text-slate-400">
              {mentor.email}
            </p>
          </div>

          <Badge
            variant={mentor.isAvailable ? "success" : "danger"}
          >
            {mentor.isAvailable ? "Available" : "Offline"}
          </Badge>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2 text-slate-300">
            <GraduationCap size={18} />
            <span>{mentor.college}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <Star
              size={18}
              className="text-yellow-400"
            />
            <span>{mentor.rating} / 5</span>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <Clock size={18} />
            <span>{mentor.totalSessions} Sessions</span>
          </div>

          <Badge>{mentor.specialization}</Badge>

          <p className="mt-4 text-sm leading-7 text-slate-400">
            {mentor.bio}
          </p>
        </div>
      </div>

      <Button
        className="mt-8"
        disabled={!mentor.isAvailable}
        onClick={(e) => {
          e.stopPropagation();
          onRequest(mentor);
        }}
      >
        Request Mentor
      </Button>
    </Card>
  );
}