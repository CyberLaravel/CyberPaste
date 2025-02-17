import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function Login({ status }: { status?: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-gray-800/50 p-8 backdrop-blur-sm"
            >
                <h2 className="mb-6 text-2xl font-bold text-yellow-400">
                    Login
                </h2>

                {status && (
                    <div className="mb-4 text-sm text-blue-300">{status}</div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 w-full bg-gray-900/50 px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                        />
                        {errors.email && (
                            <div className="mt-1 text-sm text-red-500">
                                {errors.email}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 w-full bg-gray-900/50 px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                        />
                        {errors.password && (
                            <div className="mt-1 text-sm text-red-500">
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                                className="rounded border-gray-700 bg-gray-900/50 text-yellow-400 focus:ring-yellow-400/50"
                            />
                            <span className="ml-2 text-sm text-gray-300">
                                Remember me
                            </span>
                        </label>

                        <Link
                            href={route('password.request')}
                            className="text-sm text-blue-300 transition-colors hover:text-yellow-400"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Link
                            href={route('register')}
                            className="text-sm text-blue-300 transition-colors hover:text-yellow-400"
                        >
                            Need an account?
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-yellow-400 px-4 py-2 text-black transition-colors hover:bg-yellow-300 disabled:opacity-50"
                        >
                            Log in
                        </button>
                    </div>
                </form>
            </motion.div>
        </GuestLayout>
    );
}
