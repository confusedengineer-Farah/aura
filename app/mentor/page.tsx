"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { requestMentor } from "@/lib/mentor";
import { Mentor } from "@/types/mentor";
import { useAuth } from "@/providers/AuthProvider";

import MentorCard from "@/components/mentor/MentorCard";
import FullScreenLoader from "@/components/ui/FullScreenLoader";
import EmptyState from "@/components/ui/EmptyState";
import SectionTitle from "@/components/ui/SectionTitle";

export default function MentorPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loadingMentors, setLoadingMentors] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    const q = query(
      collection(db, "mentors"),
      orderBy("rating", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mentorData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Mentor, "id">),
      }));

      setMentors(mentorData);
      setLoadingMentors(false);
    });

    return unsubscribe;
  }, []);

  async function handleRequest(mentor: Mentor) {
    if (!user) return;

    try {
      await requestMentor(user.uid, mentor.id);

      toast.success(
        `Mentor request sent to ${mentor.name} 💜`
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to send mentor request.");
    }
  }

  if (loading || loadingMentors) {
    return <FullScreenLoader />;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl p-6">

        <SectionTitle
          title="Find a Mentor"
          subtitle="Connect with experienced mentors ready to support you."
        />

        {mentors.length === 0 ? (
          <EmptyState
            title="No mentors available"
            description="Please check again later."
          />
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                onRequest={handleRequest}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}