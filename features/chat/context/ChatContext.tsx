"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export interface SelectedChat {
  id: string;
  name: string;
}

interface ChatContextType {
  selectedChat: SelectedChat | null;
  setSelectedChat: React.Dispatch<
    React.SetStateAction<SelectedChat | null>
  >;
}

const ChatContext = createContext<ChatContextType | null>(
  null
);

export function ChatProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedChat, setSelectedChat] =
    useState<SelectedChat | null>(null);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error(
      "useChat must be used inside ChatProvider"
    );
  }

  return context;
}