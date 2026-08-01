import { Sparkles } from "lucide-react";

import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";

import { getDailyAffirmation } from "@/lib/affirmations";

export default function DailyAffirmation() {
  const affirmation = getDailyAffirmation();

  return (
    <Card className="border-purple-500/20 bg-gradient-to-r from-purple-900/40 to-indigo-900/40">
      <SectionTitle
        title="Daily Affirmation"
        subtitle="A little encouragement for today."
        icon={<Sparkles size={24} />}
      />

      <div className="mt-6 rounded-xl border border-purple-500/20 bg-slate-900/60 p-6">
        <p className="text-lg leading-8 text-slate-200 italic">
          "{affirmation}"
        </p>
      </div>
    </Card>
  );
}