import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <Hero />

      <section className="max-w-6xl mx-auto px-8 py-12 grid md:grid-cols-3 gap-6">
        <FeatureCard
          emoji="💬"
          title="Listening Pods"
          description="Anonymous one-on-one chat with trained mentors."
        />

        <FeatureCard
          emoji="🏅"
          title="Hope Badges"
          description="Receive encouragement and positive affirmations."
        />

        <FeatureCard
          emoji="🚨"
          title="SOS Support"
          description="Instant emergency support whenever you need it."
        />
      </section>
    </main>
  );
}