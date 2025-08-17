import { UserProgress, TypingStats, LessonProgress } from '../types';

const STORAGE_KEY = 'typing-tutor-progress';

export const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
};

export const loadProgress = (): UserProgress | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load progress:', error);
    return null;
  }
};

export const initializeProgress = (): UserProgress => {
  const now = new Date().toISOString();
  return {
    totalSessions: 0,
    totalTimeSpent: 0,
    averageWpm: 0,
    averageAccuracy: 0,
    lessonsCompleted: [],
    recentStats: [],
    createdAt: now,
    lastUpdated: now,
  };
};

export const updateProgress = (stats: TypingStats, lessonId?: string): void => {
  let progress = loadProgress() || initializeProgress();
  
  progress.totalSessions += 1;
  progress.totalTimeSpent += stats.timeElapsed;
  
  // Update recent stats (keep last 20)
  progress.recentStats = [stats, ...progress.recentStats].slice(0, 20);
  
  // Calculate averages
  if (progress.recentStats.length > 0) {
    progress.averageWpm = Math.round(
      progress.recentStats.reduce((sum, stat) => sum + stat.wpm, 0) / progress.recentStats.length
    );
    progress.averageAccuracy = Math.round(
      progress.recentStats.reduce((sum, stat) => sum + stat.accuracy, 0) / progress.recentStats.length
    );
  }
  
  // Update lesson progress if lessonId provided
  if (lessonId) {
    const existingLesson = progress.lessonsCompleted.find(l => l.lessonId === lessonId);
    if (existingLesson) {
      existingLesson.attempts += 1;
      if (stats.wpm > existingLesson.bestWpm) existingLesson.bestWpm = stats.wpm;
      if (stats.accuracy > existingLesson.bestAccuracy) existingLesson.bestAccuracy = stats.accuracy;
      if (!existingLesson.completed && stats.accuracy >= 95) {
        existingLesson.completed = true;
        existingLesson.completedAt = new Date().toISOString();
      }
    } else {
      progress.lessonsCompleted.push({
        lessonId,
        completed: stats.accuracy >= 95,
        bestWpm: stats.wpm,
        bestAccuracy: stats.accuracy,
        attempts: 1,
        completedAt: stats.accuracy >= 95 ? new Date().toISOString() : undefined,
      });
    }
  }
  
  progress.lastUpdated = new Date().toISOString();
  saveProgress(progress);
};