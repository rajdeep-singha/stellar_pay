
'use client';

import { useRouter } from 'next/navigation';

interface QuizResultProps {
  score: number;
  total: number;
}



export default function QuizResult({ score, total }: QuizResultProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <h1 className="text-5xl font-bold mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
        You Scored {score} / {total}!
      </h1>
      <p className="mb-8 text-lg text-gray‑300">
        {score === total
          ? '🎉 Perfect! You’re a StellarPay Whiz.'
          : score >= total / 2
          ? '👍 Nice job! Keep improving your finance game.'
          : '😕 Better luck next time—try again to improve your score!'}
      </p>

      <div className="flex space-x-4">
        <button
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-600 rounded-md hover:border-pink-500"
        >
          ← Back
        </button>
        <button
         onClick={() => window.location.href = '/game'}
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 rounded-md text-white"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
