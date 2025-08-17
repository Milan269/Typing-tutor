import { useState, useEffect, useCallback } from 'react';
import { TypingStats } from '../types';

interface TypingTestState {
  text: string;
  userInput: string;
  currentIndex: number;
  startTime: number | null;
  endTime: number | null;
  errors: number;
  isStarted: boolean;
  isCompleted: boolean;
}

export const useTypingTest = (targetText: string) => {
  const [state, setState] = useState<TypingTestState>({
    text: targetText,
    userInput: '',
    currentIndex: 0,
    startTime: null,
    endTime: null,
    errors: 0,
    isStarted: false,
    isCompleted: false,
  });

  const calculateStats = useCallback((): TypingStats => {
    const timeElapsed = state.endTime && state.startTime 
      ? (state.endTime - state.startTime) / 1000 / 60 
      : 0;
    
    const words = state.userInput.length / 5;
    const wpm = timeElapsed > 0 ? Math.round(words / timeElapsed) : 0;
    const accuracy = state.userInput.length > 0 
      ? Math.round(((state.userInput.length - state.errors) / state.userInput.length) * 100)
      : 100;

    return {
      wpm,
      accuracy,
      errors: state.errors,
      timeElapsed: timeElapsed * 60, // Convert back to seconds
      charactersTyped: state.userInput.length,
      date: new Date().toISOString(),
    };
  }, [state]);

  const handleInput = useCallback((input: string) => {
    setState(prev => {
      if (prev.isCompleted) return prev;

      const newState = { ...prev };
      
      // Start timing on first keystroke
      if (!newState.isStarted && input.length > 0) {
        newState.isStarted = true;
        newState.startTime = Date.now();
      }

      newState.userInput = input;
      newState.currentIndex = input.length;

      // Count errors
      let errors = 0;
      for (let i = 0; i < input.length && i < targetText.length; i++) {
        if (input[i] !== targetText[i]) {
          errors++;
        }
      }
      newState.errors = errors;

      // Check completion
      if (input.length >= targetText.length) {
        newState.isCompleted = true;
        newState.endTime = Date.now();
      }

      return newState;
    });
  }, [targetText]);

  const reset = useCallback(() => {
    setState({
      text: targetText,
      userInput: '',
      currentIndex: 0,
      startTime: null,
      endTime: null,
      errors: 0,
      isStarted: false,
      isCompleted: false,
    });
  }, [targetText]);

  const getCharacterStatus = useCallback((index: number): 'correct' | 'incorrect' | 'current' | 'pending' => {
    if (index < state.userInput.length) {
      return state.userInput[index] === targetText[index] ? 'correct' : 'incorrect';
    }
    if (index === state.currentIndex) {
      return 'current';
    }
    return 'pending';
  }, [state.userInput, state.currentIndex, targetText]);

  return {
    ...state,
    handleInput,
    reset,
    calculateStats,
    getCharacterStatus,
  };
};