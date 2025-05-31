// /src/components/Quiz.tsx
'use client';

import { useState } from 'react';
import { QuizQuestion } from '../types/quiz';
import { supabase } from '../lib/supabase';

interface QuizProps {
  userId: string;
  onComplete: (score: number, total: number) => void;
}

const QUESTION_BANK: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What does APR stand for in finance?',
    options: [
      'Annual Percentage Rate',
      'Adjusted Price Ratio',
      'Actual Payment Return',
      'Applied Profit Ratio',
    ],
    correctIndex: 0,
  },
  {
    id: 'q2',
    question: 'StellarPay allows early wage access. Which term best describes this?',
    options: [
      'Microlending',
      'Pay Advance',
      'Direct Deposit',
      'Payroll Deferral',
    ],
    correctIndex: 1,
  },
  {
    id: 'q3',
    question: 'Which blockchain protocol does StellarPay leverage for remittances?',
    options: ['Ethereum', 'Solana', 'Stellar', 'Polkadot'],
    correctIndex: 2,
  },
  {
    id: 'q4',
    question: 'If you deposit $1,000 at 5% annual interest, how much is the interest after one year?',
    options: ['$50', '$5', '$150', '$500'],
    correctIndex: 0,
  },
  {
    id: 'q5',
    question: 'Which of these is a stablecoin commonly used in crypto payments?',
    options: ['Bitcoin', 'Tether (USDT)', 'Dogecoin', 'Ethereum'],
    correctIndex: 1,
  },
];

export default function Quiz({ userId, onComplete }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const totalQuestions = QUESTION_BANK.length;
  const currentQuestion = QUESTION_BANK[currentIndex];

  const handleOptionClick = (idx: number) => {
    setSelectedOption(idx);
  };

  const handleNext = async () => {
    if (selectedOption === null) return;
    // Check correctness
    if (selectedOption === currentQuestion.correctIndex) {
      setScore((s) => s + 1);
    }
    setSelectedOption(null);

    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Quiz finished → save to Supabase
      setSubmitting(true);
      const { error } = await supabase.from('quiz_results').insert([
        {
          user_id: userId,
          score,
          total: totalQuestions,
        },
      ]);
      setSubmitting(false);
      onComplete(score, totalQuestions);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <div className="max-w-2xl w-full space-y-6">
        <h2 className="text-3xl font-semibold underline decoration-gradient-to-r from-pink-500 to-purple-500">
          Question {currentIndex + 1} / {totalQuestions}
        </h2>

        <p className="text-xl">{currentQuestion.question}</p>

        <div className="flex flex-col space-y-3">
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                className={`border rounded-md px-4 py-3 text-left hover:border-pink-500 ${
                  isSelected
                    ? 'border-pink-500 bg-pink-500/20'
                    : 'border-gray-700'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div className="flex justify‑end">
          <button
            onClick={handleNext}
            disabled={selectedOption === null || submitting}
            className={`mt-4 px-6 py-3 rounded-md text-white ${
              selectedOption === null || submitting
                ? 'bg-gray‑600 cursor‑not‑allowed'
                : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90'
            }`}
          >
            {currentIndex + 1 < totalQuestions ? 'Next →' : submitting ? 'Saving…' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
}
