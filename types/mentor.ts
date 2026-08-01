export interface Mentor {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  college: string;
  specialization: string;
  bio: string;
  isAvailable: boolean;
  rating: number;
  totalSessions: number;
}