"use client";

import { useChat, SelectedChat } from "../context/ChatContext";

const chats: SelectedChat[] = [
  {
    id: "1",
    name: "John Doe",
  },
  {
    id: "2",
    name: "Emma",
  },
  {
    id: "3",
    name: "Alex",
  },
];

export default function Sidebar() {
  const { selectedChat, setSelectedChat } = useChat();

  return (
    <aside className="w-80 border-r border-slate-800 bg-slate-900 flex flex-col">
      <div className="p-5 border-b border-slate-800">
        <h1 className="text-2xl font-bold">Aura Chat</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className={`w-full text-left p-4 transition ${
              selectedChat?.id === chat.id
                ? "bg-slate-800"
                : "hover:bg-slate-800"
            }`}
          >
            <h2 className="font-semibold">{chat.name}</h2>
          </button>
        ))}
      </div>
    </aside>
  );
}