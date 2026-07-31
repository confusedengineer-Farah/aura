type FeatureCardProps = {
  emoji: string;
  title: string;
  description: string;
};

export default function FeatureCard({
  emoji,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800 hover:border-purple-500 transition">
      <div className="text-4xl mb-4">
        {emoji}
      </div>

      <h3 className="text-2xl font-semibold mb-3">
        {title}
      </h3>

      <p className="text-slate-400">
        {description}
      </p>
    </div>
  );
}