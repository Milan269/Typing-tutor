# TypingTutor - Complete Typing Learning Web Application

A modern, feature-rich typing tutor web application built with React, TypeScript, and Tailwind CSS. Master your typing skills with interactive lessons, real-time speed tests, and comprehensive progress tracking.

![TypingTutor Screenshot](https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

### 🚀 Core Functionality
- **Real-time Typing Speed Test** - Test your WPM (Words Per Minute) with instant feedback
- **Interactive Typing Lessons** - Structured lessons from beginner to advanced levels
- **Progress Tracking** - Comprehensive statistics saved locally in your browser
- **Accuracy Monitoring** - Real-time error detection and accuracy calculation
- **Personal Dashboard** - Visual progress charts and performance analytics

### 🎨 User Experience
- **Beautiful Modern Design** - Clean, professional interface with smooth animations
- **Responsive Layout** - Optimized for desktop, tablet, and mobile devices
- **Real-time Feedback** - Character-by-character highlighting (correct/incorrect/current)
- **Micro-interactions** - Hover effects, transitions, and visual feedback
- **Intuitive Navigation** - Easy-to-use interface with clear visual hierarchy

### 📊 Advanced Features
- **Multiple Difficulty Levels** - Beginner, Intermediate, and Advanced lessons
- **Lesson Categories** - Basic keys, Numbers, Programming, Literature, and more
- **Performance Analytics** - Track improvement over time with detailed statistics
- **Session History** - View your recent typing sessions and progress
- **Achievement System** - Complete lessons and track your best scores
- **Local Storage** - All progress saved automatically in your browser

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom gradients and animations
- **Icons**: Lucide React for consistent, beautiful icons
- **Build Tool**: Vite for fast development and optimized builds
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Data Persistence**: Browser localStorage for progress tracking
- **Code Quality**: ESLint with TypeScript support

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd typing-tutor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Usage Guide

### Getting Started
1. **Home Page** - Overview of your progress and quick access to features
2. **Speed Test** - Click "Start Speed Test" for immediate typing practice
3. **Lessons** - Browse structured lessons organized by difficulty
4. **Progress** - View detailed statistics and improvement tracking

### Taking a Speed Test
1. Navigate to the Speed Test page
2. Start typing in the text area below the sample text
3. Watch real-time feedback with color-coded characters:
   - 🟢 **Green**: Correctly typed characters
   - 🔴 **Red**: Incorrect characters
   - 🔵 **Blue**: Current typing position
   - ⚪ **Gray**: Characters yet to be typed
4. View live statistics: WPM, Accuracy, Errors, and Time
5. Complete the test to save your progress automatically

### Learning with Lessons
1. Go to the Lessons page
2. Filter lessons by difficulty level (Beginner/Intermediate/Advanced)
3. Select a lesson to start practicing
4. Complete lessons to unlock achievements and track progress
5. View your best scores and completion status for each lesson

### Tracking Progress
1. Visit the Progress/Dashboard page
2. View comprehensive statistics:
   - **Best WPM**: Your highest words per minute score
   - **Average Accuracy**: Overall typing accuracy percentage
   - **Total Time**: Time spent practicing
   - **Sessions**: Number of completed practice sessions
3. Monitor recent improvement trends
4. Review session history with detailed breakdowns

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Dashboard.tsx    # Progress tracking dashboard
│   ├── LessonCard.tsx   # Individual lesson display
│   ├── LessonsPage.tsx  # Lessons overview page
│   ├── TypingDisplay.tsx # Real-time typing visualization
│   ├── TypingStats.tsx  # Statistics display component
│   └── TypingTest.tsx   # Main typing test interface
├── data/
│   └── lessons.ts       # Lesson content and configuration
├── hooks/
│   └── useTypingTest.ts # Custom hook for typing logic
├── types/
│   └── index.ts         # TypeScript type definitions
├── utils/
│   └── localStorage.ts  # Local storage management
├── App.tsx              # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#3B82F6 to #1D4ED8)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Bold weights with proper hierarchy
- **Body Text**: Optimized line spacing (150%) for readability
- **Code/Typing**: Monospace font for typing areas
- **Maximum 3 font weights** for consistency

### Spacing System
- **8px base unit** for consistent spacing
- **Responsive breakpoints** for mobile-first design
- **Proper alignment** and visual balance throughout

## 🔧 Configuration

### Lesson Customization
Edit `src/data/lessons.ts` to add new lessons:

```typescript
{
  id: 'custom-lesson',
  title: 'Your Custom Lesson',
  description: 'Description of the lesson',
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  category: 'Custom',
  estimatedTime: 10, // minutes
  text: 'Your practice text here...'
}
```

### Progress Tracking
The application automatically saves:
- Typing speed (WPM) for each session
- Accuracy percentages
- Error counts and patterns
- Time spent practicing
- Lesson completion status
- Personal best scores

## 🚀 Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🌟 Key Features Explained

### Real-time Typing Analysis
- **Character-by-character feedback** with instant visual indicators
- **Dynamic WPM calculation** based on standard 5-character word length
- **Accuracy tracking** with error counting and percentage calculation
- **Time tracking** with precise millisecond timing

### Progress Persistence
- **Automatic saving** after each completed session
- **Local storage** ensures data persists between browser sessions
- **No account required** - everything stored locally for privacy
- **Export capability** for backing up progress data

### Adaptive Learning
- **Difficulty progression** from basic keys to advanced text
- **Multiple text categories** including programming and literature
- **Performance-based recommendations** for optimal learning path
- **Achievement system** to motivate continued practice

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Lucide React** for beautiful, consistent icons
- **Tailwind CSS** for rapid UI development
- **Vite** for lightning-fast development experience
- **React Team** for the excellent framework
- **Pexels** for high-quality stock photography

## 📞 Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure localStorage is enabled in your browser
3. Try clearing browser cache and reloading
4. Verify all dependencies are properly installed

---

**Happy Typing! 🎯⌨️**

*Master your keyboard skills with TypingTutor - where speed meets accuracy in a beautiful, modern interface.*
