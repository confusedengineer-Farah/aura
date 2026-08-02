"use client";

import { useChat } from "../context/ChatContext";
import EmptyState from "./EmptyState";

export default function ChatWindow() {
  const { selectedChat } = useChat();

  if (!selectedChat) {
    return <EmptyState />;
  }

  return (
    <section className="flex flex-1 flex-col bg-slate-950">
      <header className="border-b border-slate-800 p-5">
        <h2 className="text-xl font-bold">
          {selectedChat.name}
        </h2>
      </header>

      <div className="flex-1 flex items-center justify-center text-slate-400">
        Messages will appear here.
      </div>
    </section>
  );
}