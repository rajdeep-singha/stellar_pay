// /src/app/game/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import Quiz from '../../components/Quiz';
import QuizResult from '../../components/QuizResult';
// import ProtectedRoute from "../protected/ProtectedRoute"

export default function GamePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [scoreData, setScoreData] = useState<{ score: number; total: number } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check auth state on mount
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, []);

  // If still loading… 
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white">
        <p>Loading...</p>
      </div>
    );
  }

  // If not signed in → prompt to sign in
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white px-4">
        <h1 className="text-4xl font-semibold mb-4">Hey there!</h1>
        <p className="mb-6 text-lg">You need to sign in to play the quiz.</p>
        <button
          onClick={() => router.push('/signin')}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white px-6 py-3 rounded-md"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  // If quiz finished → show results
  if (scoreData) {
    return <QuizResult score={scoreData.score} total={scoreData.total} />;
  }

  // If quiz has started → show Quiz component
  if (quizStarted) {
    return <Quiz userId={user.id} onComplete={(s, t) => setScoreData({ score: s, total: t })} />;
  }

  // Otherwise, show the “Start Quiz” hero
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white px-4">
      <h1 className="text-5xl font-bold mb-4 underline decoration-gradient-to-r from-pink-500 to-purple-500">
        Finance Quiz Challenge
      </h1>
      <p className="mb-6 text-lg text-gray‑300 text-center max-w-xl">
        Test your StellarPay knowledge and finance trivia! Earn your place on our leaderboard by acing this 5‑question quiz. Ready?
      </p>
      <button
        onClick={() => setQuizStarted(true)}
        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white px-8 py-4 rounded-lg text-xl"
      >
        Start Quiz
      </button>

    
    </div>
  );
}
