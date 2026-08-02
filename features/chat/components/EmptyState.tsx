"use client";

export default function EmptyState() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          Welcome to Aura Chat 👋
        </h2>

        <p className="mt-3 text-slate-400">
          Select a conversation from the sidebar.
        </p>
      </div>
    </div>
  );
}