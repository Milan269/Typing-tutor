import React from 'react';
import { Clock, Target, AlertTriangle, Type } from 'lucide-react';
import { TypingStats } from '../types';

interface TypingStatsProps {
  stats: TypingStats;
  isCompleted: boolean;
  timeElapsed: number;
}

export const TypingStatsDisplay: React.FC<TypingStatsProps> = ({
  stats,
  isCompleted,
  timeElapsed,
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
        <div className="flex items-center space-x-2 mb-2">
          <Type className="w-5 h-5" />
          <span className="text-sm font-medium opacity-90">WPM</span>
        </div>
        <div className="text-2xl font-bold">
          {isCompleted ? stats.wpm : Math.round((stats.charactersTyped / 5) / (timeElapsed / 60) || 0)}
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
        <div className="flex items-center space-x-2 mb-2">
          <Target className="w-5 h-5" />
          <span className="text-sm font-medium opacity-90">Accuracy</span>
        </div>
        <div className="text-2xl font-bold">{stats.accuracy}%</div>
      </div>

      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white">
        <div className="flex items-center space-x-2 mb-2">
          <AlertTriangle className="w-5 h-5" />
          <span className="text-sm font-medium opacity-90">Errors</span>
        </div>
        <div className="text-2xl font-bold">{stats.errors}</div>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-5 h-5" />
          <span className="text-sm font-medium opacity-90">Time</span>
        </div>
        <div className="text-2xl font-bold">
          {formatTime(isCompleted ? stats.timeElapsed : timeElapsed)}
        </div>
      </div>
    </div>
  );
};