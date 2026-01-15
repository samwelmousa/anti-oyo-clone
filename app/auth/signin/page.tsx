'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError('Invalid credentials');
                return;
            }

            router.push('/');
            router.refresh();
        } catch (err) {
            setError('Something went wrong');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-xl">
                <div className="bg-red-600 p-6 text-center text-white">
                    <h1 className="text-2xl font-bold">OYO Login</h1>
                    <p className="opacity-90">Sign in to book your stay</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8">
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded border border-gray-300 p-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                                placeholder="demo@oyo.clone"
                                required
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded border border-gray-300 p-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                                placeholder="password123"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="mt-4 rounded bg-red-100 p-2 text-center text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="mt-6 w-full rounded bg-red-600 py-2.5 font-bold text-white transition-colors hover:bg-red-700"
                    >
                        Login
                    </button>

                    <p className="mt-4 text-center text-xs text-gray-500">
                        Are you a new user? <Link href="#" className="font-bold text-red-600 hover:underline">Sign up</Link>
                    </p>
                </form>

                <div className="border-t bg-gray-50 p-4 text-center text-xs text-gray-400">
                    Demo credentials: demo@oyo.clone / password123
                </div>
            </div>
        </div>
    );
}
