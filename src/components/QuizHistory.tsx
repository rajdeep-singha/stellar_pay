// /src/components/QuizHistory.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface ResultRow {
  id: string;
  score: number;
  total: number;
  taken_at: string;
}

export default function QuizHistory() {
  const [history, setHistory] = useState<ResultRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
     

  const { data, error } = await supabase
  .from('quiz_results')
  .select('id, score, total, taken_at')
  .eq('user_id', user.id)
  .order('taken_at', { ascending: false })
  .limit(10);


      if (error) {
        console.error(error);
      } else {
        setHistory(data || []);
      }
      setLoading(false);
    };
    fetchHistory();
  }, []);

  if (loading) return <p className="text-gray-300">Loading history…</p>;
  if (history.length === 0)
    return <p className="text-gray-300">No quiz attempts yet.</p>;

  return (
    <div className="space-y-2">
      {history.map((row) => (
        <div
          key={row.id}
          className="flex justify-between border-b border-gray-700 py-2"
        >
          <span>{new Date(row.taken_at).toLocaleString()}</span>
          <span>
            {row.score}/{row.total}
          </span>
        </div>
      ))}
    </div>
  );
}
