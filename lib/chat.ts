import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export async function createChat(
  userId: string,
  mentorId: string
) {
  const chatId = [userId, mentorId].sort().join("_");

  const chatRef = doc(db, "chats", chatId);

  const chatSnap = await getDoc(chatRef);

  if (!chatSnap.exists()) {
    await setDoc(chatRef, {
      members: [userId, mentorId],
      lastMessage: "",
      lastUpdated: serverTimestamp(),
    });
  }

  return chatId;
}

export async function sendMessage(
  chatId: string,
  senderId: string,
  text: string
) {
  if (!text.trim()) return;

  await addDoc(
    collection(db, "chats", chatId, "messages"),
    {
      senderId,
      text,
      read: false,
      createdAt: serverTimestamp(),
    }
  );

  await setDoc(
    doc(db, "chats", chatId),
    {
      lastMessage: text,
      lastUpdated: serverTimestamp(),
    },
    { merge: true }
  );
}