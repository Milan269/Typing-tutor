import React from 'react';
import { Clock, Award, BookOpen } from 'lucide-react';
import { Lesson, LessonProgress } from '../types';

interface LessonCardProps {
  lesson: Lesson;
  progress?: LessonProgress;
  onClick: (lesson: Lesson) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, progress, onClick }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div
      onClick={() => onClick(lesson)}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {lesson.title}
            </h3>
          </div>
          <p className="text-gray-600 text-sm mb-3">{lesson.description}</p>
        </div>
        {progress?.completed && (
          <Award className="w-6 h-6 text-yellow-500 flex-shrink-0 ml-4" />
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(lesson.difficulty)}`}>
            {lesson.difficulty}
          </span>
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <Clock className="w-4 h-4" />
            <span>{lesson.estimatedTime}min</span>
          </div>
        </div>
        
        {progress && (
          <div className="text-right text-sm">
            <div className="text-gray-600">Best: {progress.bestWpm} WPM</div>
            <div className="text-gray-500">{progress.attempts} attempts</div>
          </div>
        )}
      </div>

      {progress && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500">Best Accuracy</span>
            <span className="text-xs font-medium">{progress.bestAccuracy}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress.bestAccuracy, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};