// src/hooks/useQuiz.ts
import { useState } from 'react';
import { QuizQuestion } from '../types/quiz';

function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function useQuiz(allQuestions: QuizQuestion[], questionCount: number = 5) {
  const [questions] = useState<QuizQuestion[]>(
    shuffleArray(allQuestions).slice(0, questionCount)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (index: number) => setSelectedOption(index);

  const handleNext = async (onComplete: (score: number, total: number) => void) => {
    if (selectedOption === null) return;

    if (selectedOption === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }

    const nextIndex = currentIndex + 1;
    setSelectedOption(null);

    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      setIsSubmitting(true);
      // Perform any save-to-DB logic here if needed
      setIsSubmitting(false);
      setIsFinished(true);
      onComplete(score + (selectedOption === currentQuestion.correctIndex ? 1 : 0), questions.length);
    }
  };

  return {
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    selectedOption,
    score,
    isSubmitting,
    isFinished,
    handleOptionClick,
    handleNext,
  };
}
