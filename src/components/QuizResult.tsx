
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState,useRef } from 'react';
import { supabase } from '@/lib/supabase';
interface QuizResultProps {
  score: number;
  total: number;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  attempts: number;
  total_score: number;
  average_score: number;
}

export default function QuizResult({ score, total }: QuizResultProps) {
  const router = useRouter();


const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
const hasRun = useRef(false); 

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const updateLeaderboard = async () => {
      let name = prompt('Enter your name for the leaderboard:');
      if (!name) name = 'Anonymous';

      //  user already exists
      const { data: existingUser, error } = await supabase
        .from('leaderboard')
        .select('*')
        .eq('name', name)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user:', error);
        return;
      }

      if (existingUser) {
        const updatedAttempts = existingUser.attempts + 1;
        const updatedTotalScore = existingUser.total_score + score;
        const updatedAverage = updatedTotalScore / updatedAttempts;

        await supabase.from('leaderboard').update({
          attempts: updatedAttempts,
          total_score: updatedTotalScore,
          average_score: updatedAverage,
        }).eq('name', name);
      } else {
        await supabase.from('leaderboard').insert({
          name,
          attempts: 1,
          total_score: score,
          average_score: score,
        });
      }

      //  updated leaderboard
      const { data: lb } = await supabase
        .from('leaderboard')
        .select('*')
        .order('average_score', { ascending: false });

      setLeaderboard(lb || []);
    };

    updateLeaderboard();
  }, [score]);



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <h1 className="text-5xl font-bold mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
        You Scored {score} / {total}!
      </h1>
      <p className="mb-8 text-lg text-gray-300">
        {score === total
          ? '🎉 Perfect! You are a StellarPay Whiz.'
          : score >= total / 2
          ? '👍 Nice job! Keep improving your finance game.'
          : '😕 Better luck next time—try again to improve your score!'}
      </p>
 <div className="flex space-x-4 mb-8">
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


        <button
  onClick={() => router.push('/leaderboard')}
  className="px-6 py-3 border border-gray-600 rounded-md hover:border-purple-500"
>
  View Leaderboard
</button>


      </div>

      <h2 className="text-2xl font-semibold mb-4 underline">🏆 Leaderboard</h2>
      <div className="w-full max-w-xl">
        <table className="w-full border border-gray-700 text-left">
          <thead>
            <tr className="bg-gray-800">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Attempts</th>
              <th className="py-2 px-4">Avg Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr key={entry.id} className="border-t border-gray-700">
                <td className="py-2 px-4">{entry.name}</td>
                <td className="py-2 px-4">{entry.attempts}</td>
                <td className="py-2 px-4">{entry.average_score.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}