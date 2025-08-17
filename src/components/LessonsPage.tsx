import React, { useState } from 'react';
import { BookOpen, Filter } from 'lucide-react';
import { lessons } from '../data/lessons';
import { LessonCard } from './LessonCard';
import { TypingTest } from './TypingTest';
import { loadProgress } from '../utils/localStorage';
import { Lesson } from '../types';

export const LessonsPage: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  
  const progress = loadProgress();
  const lessonProgress = progress?.lessonsCompleted || [];

  const filteredLessons = lessons.filter(lesson => 
    difficultyFilter === 'all' || lesson.difficulty === difficultyFilter
  );

  if (selectedLesson) {
    return (
      <TypingTest
        text={selectedLesson.text}
        lessonId={selectedLesson.id}
        onBack={() => setSelectedLesson(null)}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Typing Lessons</h1>
        <p className="text-gray-600">Structured lessons to improve your typing skills step by step</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span className="text-gray-700 font-medium">{filteredLessons.length} lessons available</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLessons.map(lesson => {
          const progress = lessonProgress.find(p => p.lessonId === lesson.id);
          return (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              progress={progress}
              onClick={setSelectedLesson}
            />
          );
        })}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-500 mb-2">No lessons found</h3>
          <p className="text-gray-400">Try adjusting your filter settings</p>
        </div>
      )}
    </div>
  );
};