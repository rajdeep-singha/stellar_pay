// /src/app/leaderboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface LeaderboardEntry {
  id: string;
  name: string;
  attempts: number;
  total_score: number;
  average_score: number;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('average_score', { ascending: false });

      if (error) {
        console.error('Error fetching leaderboard:', error);
      } else {
        setLeaderboard(data || []);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-8">
        🏆 Leaderboard
      </h1>

      <table className="w-full max-w-3xl border border-gray-700 text-left">
        <thead>
          <tr className="bg-gray-800">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Attempts</th>
            <th className="py-2 px-4">Avg Score</th>
            <th className="py-2 px-4">Total Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry) => (
            <tr key={entry.id} className="border-t border-gray-700">
              <td className="py-2 px-4">{entry.name}</td>
              <td className="py-2 px-4">{entry.attempts}</td>
              <td className="py-2 px-4">{entry.average_score.toFixed(2)}</td>
              <td className="py-2 px-4">{entry.total_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
