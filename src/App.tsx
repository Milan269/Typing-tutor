import React, { useState, useEffect } from 'react';
import { Keyboard, BookOpen, BarChart3, Zap } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { TypingTest } from './components/TypingTest';
import { LessonsPage } from './components/LessonsPage';
import { loadProgress, initializeProgress } from './utils/localStorage';
import { UserProgress } from './types';

type Page = 'home' | 'test' | 'lessons' | 'progress';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const progress = loadProgress();
    if (progress) {
      setUserProgress(progress);
    } else {
      const newProgress = initializeProgress();
      setUserProgress(newProgress);
    }
  }, []);

  // Refresh progress data when returning to home or progress page
  useEffect(() => {
    if (currentPage === 'home' || currentPage === 'progress') {
      const progress = loadProgress();
      if (progress) {
        setUserProgress(progress);
      }
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'test':
        return <TypingTest onBack={() => setCurrentPage('home')} />;
      case 'lessons':
        return <LessonsPage />;
      case 'progress':
        return userProgress ? <Dashboard progress={userProgress} /> : null;
      default:
        return <HomePage onNavigate={setCurrentPage} userProgress={userProgress} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <Keyboard className="w-6 h-6" />
              <span>TypingTutor</span>
            </button>
            
            <div className="flex space-x-1">
              <NavButton
                icon={<Keyboard className="w-4 h-4" />}
                label="Home"
                active={currentPage === 'home'}
                onClick={() => setCurrentPage('home')}
              />
              <NavButton
                icon={<Zap className="w-4 h-4" />}
                label="Speed Test"
                active={currentPage === 'test'}
                onClick={() => setCurrentPage('test')}
              />
              <NavButton
                icon={<BookOpen className="w-4 h-4" />}
                label="Lessons"
                active={currentPage === 'lessons'}
                onClick={() => setCurrentPage('lessons')}
              />
              <NavButton
                icon={<BarChart3 className="w-4 h-4" />}
                label="Progress"
                active={currentPage === 'progress'}
                onClick={() => setCurrentPage('progress')}
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
    </div>
  );
}

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      active
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

interface HomePageProps {
  onNavigate: (page: Page) => void;
  userProgress: UserProgress | null;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, userProgress }) => {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Typing Skills</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Improve your typing speed and accuracy with our comprehensive lessons and interactive tests. 
          Track your progress and become a typing master!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('test')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-600/25"
          >
            Start Speed Test
          </button>
          <button
            onClick={() => onNavigate('lessons')}
            className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Browse Lessons
          </button>
        </div>
      </div>

      {userProgress && userProgress.totalSessions > 0 && (
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{userProgress.averageWpm}</div>
              <div className="text-gray-600">Average WPM</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{userProgress.averageAccuracy}%</div>
              <div className="text-gray-600">Average Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{userProgress.totalSessions}</div>
              <div className="text-gray-600">Sessions Completed</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Zap className="w-8 h-8 text-blue-600" />}
          title="Speed Tests"
          description="Test your typing speed with various texts and track your WPM improvement over time."
          onClick={() => onNavigate('test')}
        />
        <FeatureCard
          icon={<BookOpen className="w-8 h-8 text-green-600" />}
          title="Structured Lessons"
          description="Learn touch typing from basics to advanced with our carefully designed lesson progression."
          onClick={() => onNavigate('lessons')}
        />
        <FeatureCard
          icon={<BarChart3 className="w-8 h-8 text-purple-600" />}
          title="Progress Tracking"
          description="Monitor your improvement with detailed statistics and performance analytics."
          onClick={() => onNavigate('progress')}
        />
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
      {title}
    </h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default App;