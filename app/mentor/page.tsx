"use client";

import { useEffect, useMemo, useState } from "react";
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
import MentorFilters from "@/components/mentor/MentorFilters";

import FullScreenLoader from "@/components/ui/FullScreenLoader";
import EmptyState from "@/components/ui/EmptyState";
import SectionTitle from "@/components/ui/SectionTitle";

export default function MentorPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loadingMentors, setLoadingMentors] = useState(true);

  const [search, setSearch] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);

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
      const mentorData: Mentor[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Mentor, "id">),
      }));

      setMentors(mentorData);
      setLoadingMentors(false);
    });

    return unsubscribe;
  }, []);

  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) => {
      const matchesSearch =
        mentor.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        mentor.specialization
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesAvailability =
        !availableOnly || mentor.isAvailable;

      return matchesSearch && matchesAvailability;
    });
  }, [mentors, search, availableOnly]);

  async function handleRequest(mentor: Mentor) {
    if (!user) return;

    try {
      await requestMentor(user.uid, mentor.id);

      toast.success(
        `Request sent to ${mentor.name} 💜`
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to send request.");
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

        <MentorFilters
          search={search}
          setSearch={setSearch}
          availableOnly={availableOnly}
          setAvailableOnly={setAvailableOnly}
        />

        {filteredMentors.length === 0 ? (
          <EmptyState
            title="No mentors found"
            description="Try changing your search or filters."
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredMentors.map((mentor) => (
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