"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Send } from "lucide-react";

import { db } from "@/lib/firebase";
import { createChat, sendMessage } from "@/lib/chat";
import { useAuth } from "@/providers/AuthProvider";
import { Message } from "@/types/chat";

import Button from "@/components/ui/Button";
import FullScreenLoader from "@/components/ui/FullScreenLoader";

const DEMO_MENTOR_ID = "demo-mentor";

export default function ChatPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [chatId, setChatId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;

    async function initChat() {
      const id = await createChat(user.uid, DEMO_MENTOR_ID);

      setChatId(id);
    }

    initChat();
  }, [user]);

  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Message[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Message, "id">),
      }));

      setMessages(data);
    });

    return unsubscribe;
  }, [chatId]);

  const sortedMessages = useMemo(() => messages, [messages]);

  async function handleSend() {
    if (!user || !chatId || !text.trim()) return;

    await sendMessage(chatId, user.uid, text);

    setText("");
  }

  if (loading || !user) {
    return <FullScreenLoader />;
  }

  return (
    <main className="flex h-screen flex-col bg-slate-950 text-white">
      <header className="border-b border-slate-800 p-5">
        <h1 className="text-2xl font-bold">
          Aura Chat
        </h1>

        <p className="text-sm text-slate-400">
          Connected to Demo Mentor
        </p>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {sortedMessages.map((message) => (
          <div
            key={message.id}
            className={`max-w-xs rounded-2xl px-4 py-3 ${
              message.senderId === user.uid
                ? "ml-auto bg-purple-600"
                : "bg-slate-800"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className="border-t border-slate-800 p-4">
        <div className="flex gap-3">
          <input
            className="flex-1 rounded-xl bg-slate-800 px-80 py-3 outline-none"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />

          <Button onClick={handleSend}>
            <Send size={18} />
          </Button>
        </div>
      </div>
    </main>
  );
}