'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import pb from '@/lib/pocketbase';
import { toast } from '@/components/ui/Toaster';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await pb.collection('users').authWithPassword(email, password);
      toast('✅ Login successful!');
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
      toast('Invalid email or password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-100">BillsTracker</h1>
          <p className="text-sm text-slate-400">Sign in to continue</p>
        </div>
        <form onSubmit={handleLogin} className="card p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}