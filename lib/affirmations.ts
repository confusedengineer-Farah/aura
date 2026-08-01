const affirmations = [
  "🌱 Small steps still move you forward.",
  "💜 You survived 100% of your hardest days.",
  "✨ Asking for help is a sign of strength.",
  "🌤️ Today is another chance to grow.",
  "🌸 Your feelings are valid.",
  "🤝 You are never alone.",
  "⭐ Progress is more important than perfection.",
  "🫶 Be proud of how far you've come.",
  "🌈 Better days are coming.",
  "💙 It's okay to take a break.",
  "🚀 One small action today can change tomorrow.",
  "🌻 Healing isn't linear, and that's okay.",
  "❤️ Kindness starts with yourself.",
  "🌙 Rest is productive too.",
  "💡 Every day is a fresh beginning.",
];

export function getDailyAffirmation() {
  const day = new Date().getDate();

  return affirmations[day % affirmations.length];
}