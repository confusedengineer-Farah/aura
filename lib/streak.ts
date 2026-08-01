export interface MoodEntry {
  createdAt?: {
    toDate: () => Date;
  };
}

function startOfDay(date: Date): Date {
  const day = new Date(date);
  day.setHours(0, 0, 0, 0);
  return day;
}

export function calculateMoodStreak(
  moods: MoodEntry[]
): number {
  if (moods.length === 0) return 0;

  const uniqueDays = Array.from(
    new Set(
      moods
        .map((mood) => mood.createdAt?.toDate())
        .filter(Boolean)
        .map((date) => startOfDay(date as Date).getTime())
    )
  ).sort((a, b) => b - a);

  let streak = 0;
  let currentDay = startOfDay(new Date()).getTime();

  for (const day of uniqueDays) {
    if (day === currentDay) {
      streak++;
      currentDay -= 24 * 60 * 60 * 1000;
    } else if (day === currentDay + 24 * 60 * 60 * 1000 && streak === 0) {
      // User hasn't checked in today yet, but did yesterday.
      streak++;
      currentDay = day - 24 * 60 * 60 * 1000;
    } else {
      break;
    }
  }

  return streak;
}