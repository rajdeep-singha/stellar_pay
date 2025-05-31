'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      router.push('/game'); // redirect to game page
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="p-6 border rounded-lg max-w-md w-full shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In to Play</h1>

        <form onSubmit={handleSignIn} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Sign In'}
          </Button>
        </form>

        <p className="text-center mt-4 text-sm text-muted-foreground">
          Do not have an account? <a href="/signup" className="text-primary underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
