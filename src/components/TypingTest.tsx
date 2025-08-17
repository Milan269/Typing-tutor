import React, { useState, useEffect } from 'react';
import { RefreshCw, Home } from 'lucide-react';
import { useTypingTest } from '../hooks/useTypingTest';
import { TypingDisplay } from './TypingDisplay';
import { TypingStatsDisplay } from './TypingStats';
import { updateProgress } from '../utils/localStorage';

interface TypingTestProps {
  text?: string;
  lessonId?: string;
  onComplete?: () => void;
  onBack?: () => void;
}

export const TypingTest: React.FC<TypingTestProps> = ({ 
  text = "The quick brown fox jumps over the lazy dog. This sentence contains every letter in the English alphabet.", 
  lessonId,
  onComplete,
  onBack 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  const {
    userInput,
    currentIndex,
    isStarted,
    isCompleted,
    handleInput,
    reset,
    calculateStats,
    getCharacterStatus,
  } = useTypingTest(text);

  // Update input value and handle typing test
  useEffect(() => {
    setInputValue(userInput);
  }, [userInput]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStarted && !isCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStarted, isCompleted]);

  // Handle completion
  useEffect(() => {
    if (isCompleted) {
      const stats = calculateStats();
      updateProgress(stats, lessonId);
      if (onComplete) {
        onComplete();
      }
    }
  }, [isCompleted, calculateStats, lessonId, onComplete]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
    handleInput(value);
  };

  const handleReset = () => {
    reset();
    setInputValue('');
    setTimeElapsed(0);
  };

  const stats = calculateStats();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Typing Test</h1>
          <p className="text-gray-600 mt-1">Type the text below as accurately and quickly as possible</p>
        </div>
        <div className="flex space-x-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <TypingStatsDisplay 
        stats={stats} 
        isCompleted={isCompleted}
        timeElapsed={timeElapsed}
      />

      <TypingDisplay
        text={text}
        userInput={userInput}
        currentIndex={currentIndex}
        getCharacterStatus={getCharacterStatus}
      />

      <div className="space-y-4">
        <label htmlFor="typing-input" className="block text-sm font-medium text-gray-700">
          Type here:
        </label>
        <textarea
          id="typing-input"
          value={inputValue}
          onChange={handleInputChange}
          disabled={isCompleted}
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-lg disabled:bg-gray-50"
          placeholder={isCompleted ? "Test completed!" : "Start typing..."}
          autoFocus
        />
      </div>

      {isCompleted && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Test Complete! 🎉</h3>
          <p className="text-gray-700">
            Great job! Your progress has been saved automatically. 
            {stats.accuracy >= 95 && lessonId && " You've completed this lesson!"}
          </p>
        </div>
      )}
    </div>
  );
};