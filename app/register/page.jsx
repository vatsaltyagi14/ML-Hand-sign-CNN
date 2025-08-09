'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        router.push('/login');
      } else {
        const data = await res.json();
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[--color-brand-indigo]">
            Create Your Account
          </h1>
          <p className="mt-2 text-[--color-brand-gray]">
            Start your journey to wellness.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[--color-brand-gray]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-[--color-brand-indigo] bg-white border border-[--color-brand-blue] rounded-md focus:outline-none focus:ring-2 focus:ring-[--color-brand-accent]"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[--color-brand-gray]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength="6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-[--color-brand-indigo] bg-white border border-[--color-brand-blue] rounded-md focus:outline-none focus:ring-2 focus:ring-[--color-brand-accent]"
            />
          </div>
          {error && <p className="text-xs text-center text-red-600">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 font-semibold text-white bg-[--color-brand-indigo] rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--color-brand-indigo] disabled:opacity-60 transition"
            >
              {isLoading ? 'Creating...' : 'Sign Up'}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-[--color-brand-gray]">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-[--color-brand-accent] hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
