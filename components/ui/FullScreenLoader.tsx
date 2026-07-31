export default function FullScreenLoader() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-purple-500" />

        <h2 className="text-white text-lg font-semibold">
          Loading Aura...
        </h2>

        <p className="text-slate-400 text-sm">
          Preparing your safe space.
        </p>
      </div>
    </main>
  );
}