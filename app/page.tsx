export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="flex items-center justify-between px-8 py-6 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-purple-400">Aura</h1>

        <div className="space-x-4">
          <button className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700">
            Login
          </button>

          <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700">
            Get Started
          </button>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-8 py-24">
        <h2 className="text-6xl font-bold leading-tight">
          A Safe Place
          <br />
          To Be Heard.
        </h2>

        <p className="mt-8 text-xl text-slate-300 max-w-2xl">
          Anonymous peer support for teenagers through trained mentors,
          private chat, encouragement badges, and emergency assistance.
        </p>

        <button className="mt-10 px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-lg font-semibold">
          Start Your Journey
        </button>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-12 grid md:grid-cols-3 gap-6">
        <div className="bg-slate-900 rounded-xl p-6">
          <h3 className="text-2xl font-semibold mb-3">💬 Listening Pods</h3>
          <p className="text-slate-400">
            Chat anonymously with trained mentors who are ready to listen.
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h3 className="text-2xl font-semibold mb-3">🏅 Hope Badges</h3>
          <p className="text-slate-400">
            Receive encouragement and positive affirmations from mentors.
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h3 className="text-2xl font-semibold mb-3">🚨 SOS Support</h3>
          <p className="text-slate-400">
            Instantly notify mentors during moments when immediate help is needed.
          </p>
        </div>
      </section>
    </main>
  );
}