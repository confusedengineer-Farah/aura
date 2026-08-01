export interface MoodEntry {
  id: string;
  mood: string;
  createdAt?: {
    toDate: () => Date;
  };
}

export interface DashboardContextType {
  moods: MoodEntry[];
  loading: boolean;
}