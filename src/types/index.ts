export interface TypingStats {
  wpm: number;
  accuracy: number;
  errors: number;
  timeElapsed: number;
  charactersTyped: number;
  date: string;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  bestWpm: number;
  bestAccuracy: number;
  attempts: number;
  completedAt?: string;
}

export interface UserProgress {
  totalSessions: number;
  totalTimeSpent: number;
  averageWpm: number;
  averageAccuracy: number;
  lessonsCompleted: LessonProgress[];
  recentStats: TypingStats[];
  createdAt: string;
  lastUpdated: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  text: string;
  category: string;
  estimatedTime: number;
}