// /src/types/quiz.ts

/** One multiple‑choice question */
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  /** Index (0‑based) of the correct answer in `options` */
  correctIndex: number;
}

/** Format to insert into Supabase */
export interface QuizResultPayload {
  user_id: string;
  score: number;
  total: number;
}
