import React from 'react';
import { Trophy, Target, Clock, TrendingUp, Calendar } from 'lucide-react';
import { UserProgress } from '../types';

interface DashboardProps {
  progress: UserProgress;
}

export const Dashboard: React.FC<DashboardProps> = ({ progress }) => {
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getRecentImprovement = () => {
    if (progress.recentStats.length < 2) return null;
    const latest = progress.recentStats[0].wpm;
    const previous = progress.recentStats[1].wpm;
    const improvement = latest - previous;
    return improvement;
  };

  const improvement = getRecentImprovement();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Progress</h1>
        <p className="text-gray-600">Track your typing improvement over time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Trophy className="w-8 h-8" />
            <span className="text-sm opacity-90">Best WPM</span>
          </div>
          <div className="text-3xl font-bold mb-1">
            {Math.max(...(progress.recentStats.map(s => s.wpm) || [0]))}
          </div>
          <div className="text-sm opacity-90">Words per minute</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8" />
            <span className="text-sm opacity-90">Avg Accuracy</span>
          </div>
          <div className="text-3xl font-bold mb-1">{progress.averageAccuracy}%</div>
          <div className="text-sm opacity-90">Average accuracy</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8" />
            <span className="text-sm opacity-90">Time Spent</span>
          </div>
          <div className="text-3xl font-bold mb-1">{formatTime(progress.totalTimeSpent)}</div>
          <div className="text-sm opacity-90">Total practice time</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8" />
            <span className="text-sm opacity-90">Sessions</span>
          </div>
          <div className="text-3xl font-bold mb-1">{progress.totalSessions}</div>
          <div className="text-sm opacity-90">Practice sessions</div>
        </div>
      </div>

      {improvement !== null && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`p-2 rounded-lg ${improvement >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              <TrendingUp className={`w-5 h-5 ${improvement >= 0 ? 'text-green-600' : 'text-red-600'}`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Recent Improvement</h3>
              <p className="text-sm text-gray-600">Compared to your previous session</p>
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className={`text-2xl font-bold ${improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {improvement >= 0 ? '+' : ''}{improvement}
            </span>
            <span className="text-sm text-gray-500">WPM</span>
          </div>
        </div>
      )}

      {progress.recentStats.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Recent Sessions</h3>
          </div>
          <div className="space-y-3">
            {progress.recentStats.slice(0, 5).map((stat, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">
                    {new Date(stat.date).toLocaleDateString()}
                  </div>
                  <div className="text-sm font-medium">{stat.wpm} WPM</div>
                  <div className="text-sm text-gray-600">{stat.accuracy}% accuracy</div>
                </div>
                <div className="text-sm text-gray-500">
                  {formatTime(stat.timeElapsed)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};