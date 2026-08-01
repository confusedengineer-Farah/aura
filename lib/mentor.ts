import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Mentor } from "@/types/mentor";

export async function getMentors(): Promise<Mentor[]> {
  const q = query(
    collection(db, "mentors"),
    orderBy("rating", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Mentor, "id">),
  }));
}

export async function requestMentor(
  userId: string,
  mentorId: string
) {
  await addDoc(collection(db, "mentorRequests"), {
    userId,
    mentorId,
    status: "pending",
    createdAt: serverTimestamp(),
  });
}