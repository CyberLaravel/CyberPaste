import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';

interface FormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    terms: boolean;
}

const getPasswordStrength = (password: string): [number, string] => {
    if (!password) return [0, ''];

    let strength = 0;
    let feedback = [];

    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9!@#$%^&*]/.test(password)) strength += 25;

    if (strength < 50) feedback.push('Add uppercase letters and numbers');
    else if (strength < 75) feedback.push('Add special characters');

    return [strength, feedback.join('. ')];
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } =
        useForm<FormData>({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            terms: false,
        });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const [passwordStrength, passwordFeedback] = useMemo(
        () => getPasswordStrength(data.password),
        [data.password],
    );

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-gray-800/50 p-8 backdrop-blur-sm"
            >
                <h2 className="mb-6 text-2xl font-bold text-yellow-400">
                    Create Account
                </h2>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-300">
                            Name
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            autoComplete="name"
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 w-full bg-gray-900/50 px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                        />
                        {errors.name && (
                            <div className="mt-1 text-sm text-red-500">
                                {errors.name}
                            </div>
                        )}
                    </div>

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
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 w-full bg-gray-900/50 px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                        />
                        {data.password && (
                            <div className="mt-2 space-y-1">
                                <div className="flex h-1 overflow-hidden rounded bg-gray-700">
                                    <motion.div
                                        className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                                        initial={{ width: 0 }}
                                        animate={{
                                            width: `${passwordStrength}%`,
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                                {passwordFeedback && (
                                    <p className="text-xs text-gray-400">
                                        {passwordFeedback}
                                    </p>
                                )}
                            </div>
                        )}
                        {errors.password && (
                            <div className="mt-1 text-sm text-red-500">
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            className="mt-1 w-full bg-gray-900/50 px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                checked={data.terms}
                                onChange={(e) =>
                                    setData('terms', e.target.checked)
                                }
                                className="mt-1 rounded border-gray-700 bg-gray-900/50 text-yellow-400 focus:ring-yellow-400/50"
                            />
                            <span className="text-sm text-gray-300">
                                I agree to the{' '}
                                <Link
                                    href={route('terms')}
                                    className="text-blue-300 transition-colors hover:text-yellow-400"
                                    target="_blank"
                                >
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link
                                    href={route('privacy')}
                                    className="text-blue-300 transition-colors hover:text-yellow-400"
                                    target="_blank"
                                >
                                    Privacy Policy
                                </Link>
                            </span>
                        </label>
                        {errors.terms && (
                            <div className="text-sm text-red-500">
                                {errors.terms}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Link
                            href={route('login')}
                            className="text-sm text-blue-300 transition-colors hover:text-yellow-400"
                        >
                            Already registered?
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-yellow-400 px-4 py-2 text-black transition-colors hover:bg-yellow-300 disabled:opacity-50"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </motion.div>
        </GuestLayout>
    );
}
