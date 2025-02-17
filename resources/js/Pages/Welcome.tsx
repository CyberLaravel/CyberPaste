import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface RecentPaste {
    slug: string;
    title: string;
    created_at: string;
}

interface Props {
    auth: {
        user: {
            name: string;
            email: string;
        } | null;
    };
    recentPastes: RecentPaste[];
    canLogin: boolean;
    canRegister: boolean;
    stats: {
        totalPastes: number;
        totalUsers: number;
        languagesUsed: number;
    };
}

export default function Welcome({
    auth,
    recentPastes,
    canLogin,
    canRegister,
    stats,
}: Props) {
    return (
        <div className="min-h-screen bg-gray-900 font-['Orbitron']">
            {/* Navigation */}
            <nav className="fixed top-0 z-50 w-full bg-gray-800/50 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex h-16 items-center justify-between">
                        <div className="glitch-effect text-2xl font-bold text-yellow-400">
                            CyberPaste
                        </div>
                        <div className="space-x-8">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="text-blue-300 transition-colors hover:text-yellow-400"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    {canLogin && (
                                        <Link
                                            href={route('login')}
                                            className="text-blue-300 transition-colors hover:text-yellow-400"
                                        >
                                            Log in
                                        </Link>
                                    )}
                                    {canRegister && (
                                        <Link
                                            href={route('register')}
                                            className="text-blue-300 transition-colors hover:text-yellow-400"
                                        >
                                            Register
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative flex min-h-screen items-center justify-center"
            >
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                    <div className="bg-grid-pattern absolute inset-0 opacity-20" />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glitch-effect mb-8 text-5xl font-bold text-yellow-400 md:text-6xl"
                    >
                        Share Code in Style
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-12 text-xl text-gray-300"
                    >
                        A modern, secure, and feature-rich pastebin with a
                        cyberpunk twist.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Link
                            href={route('pastes.create')}
                            className="inline-block bg-yellow-400 px-8 py-3 text-lg font-bold text-black transition-colors hover:bg-yellow-300"
                        >
                            Create Paste
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            {/* Stats Section */}
            <div className="bg-gray-800/30 py-16 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-8 text-center md:grid-cols-3">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-2"
                        >
                            <div className="text-4xl font-bold text-yellow-400">
                                {stats.totalPastes.toLocaleString()}
                            </div>
                            <div className="text-blue-300">Total Pastes</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="space-y-2"
                        >
                            <div className="text-4xl font-bold text-yellow-400">
                                {stats.totalUsers.toLocaleString()}
                            </div>
                            <div className="text-blue-300">Active Users</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="space-y-2"
                        >
                            <div className="text-4xl font-bold text-yellow-400">
                                {stats.languagesUsed}+
                            </div>
                            <div className="text-blue-300">
                                Languages Supported
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Recent Pastes Section */}
            {recentPastes.length > 0 && (
                <div className="bg-gray-800/50 py-16 backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-6">
                        <h2 className="mb-8 text-2xl font-bold text-yellow-400">
                            Recent Public Pastes
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {recentPastes.map((paste) => (
                                <Link
                                    key={paste.slug}
                                    href={route('pastes.show', paste.slug)}
                                    className="block space-y-2 rounded-lg bg-gray-900/50 p-4 transition-colors hover:bg-gray-900"
                                >
                                    <h3 className="font-bold text-blue-300">
                                        {paste.title || 'Untitled Paste'}
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        Created:{' '}
                                        {new Date(
                                            paste.created_at,
                                        ).toLocaleDateString()}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Features Section */}
            <div className="py-16">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                title: 'Secure Sharing',
                                description:
                                    'Password protection, expiration dates, and private pastes.',
                                icon: '🔒',
                            },
                            {
                                title: 'Syntax Highlighting',
                                description:
                                    'Support for multiple programming languages.',
                                icon: '✨',
                            },
                            {
                                title: 'Modern Interface',
                                description:
                                    'Clean, responsive design with a cyberpunk aesthetic.',
                                icon: '🎨',
                            },
                            {
                                title: 'Real-time Preview',
                                description:
                                    'See your formatted code as you type.',
                                icon: '👁️',
                            },
                            {
                                title: 'Version Control',
                                description:
                                    'Track changes with paste history.',
                                icon: '📝',
                            },
                            {
                                title: 'API Access',
                                description:
                                    'Integrate with your applications.',
                                icon: '🔌',
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                className="space-y-4 rounded-lg bg-gray-800/50 p-6 backdrop-blur-sm"
                            >
                                <div className="text-3xl">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-yellow-400">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-300">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-800/30 py-16 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mb-12 text-center text-3xl font-bold text-yellow-400"
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        {[
                            {
                                q: 'Is it free to use?',
                                a: 'Yes, CyberPaste is completely free for basic usage.',
                            },
                            {
                                q: 'How long are pastes stored?',
                                a: 'Pastes can be stored indefinitely or set to expire after a specific time.',
                            },
                            {
                                q: 'Is my code secure?',
                                a: 'Yes, we offer password protection and private paste options.',
                            },
                            {
                                q: 'What languages are supported?',
                                a: 'We support all major programming languages with syntax highlighting.',
                            },
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                className="rounded-lg bg-gray-900/50 p-6"
                            >
                                <h3 className="mb-3 text-xl font-bold text-yellow-400">
                                    {faq.q}
                                </h3>
                                <p className="text-gray-300">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
