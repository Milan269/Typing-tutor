import React from 'react';

interface TypingDisplayProps {
  text: string;
  userInput: string;
  currentIndex: number;
  getCharacterStatus: (index: number) => 'correct' | 'incorrect' | 'current' | 'pending';
}

export const TypingDisplay: React.FC<TypingDisplayProps> = ({
  text,
  currentIndex,
  getCharacterStatus,
}) => {
  return (
  <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-100 w-full max-w-full overflow-x-hidden">
  <div className="text-base sm:text-lg leading-relaxed font-mono tracking-wide break-words whitespace-pre-wrap">
    {text.split('').map((char, index) => {
      const status = getCharacterStatus(index);
      let className = 'relative ';

      switch (status) {
        case 'correct':
          className += 'text-green-600 bg-green-50';
          break;
        case 'incorrect':
          className += 'text-red-600 bg-red-100';
          break;
        case 'current':
          className += 'text-gray-900 bg-blue-200 animate-pulse';
          break;
        default:
          className += 'text-gray-400';
      }

      return (
        <span key={index} className={className}>
          {char === ' ' ? '\u00A0' : char}
          {status === 'current' && (
            <span className="absolute top-0 left-0 w-0.5 h-full bg-blue-600 animate-pulse" />
          )}
        </span>
      );
    })}
  </div>
</div>

  );
};