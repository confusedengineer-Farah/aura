"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { DashboardContextType, MoodEntry } from "@/types/dashboard";

export const DashboardContext = createContext<DashboardContextType>({
  moods: [],
  loading: true,
});

interface DashboardProviderProps {
  uid: string;
  children: ReactNode;
}

export function DashboardProvider({
  uid,
  children,
}: DashboardProviderProps) {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;

    const q = query(
      collection(db, "users", uid, "moods"),
      orderBy("createdAt", "desc"),
      limit(30)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const moodData: MoodEntry[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<MoodEntry, "id">),
      }));

      setMoods(moodData);
      setLoading(false);
    });

    return unsubscribe;
  }, [uid]);

  return (
    <DashboardContext.Provider
      value={{
        moods,
        loading,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}