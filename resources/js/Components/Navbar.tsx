import { User } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
    user: User | null;
}

export default function Navbar({ user }: Props) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { url } = usePage();

    const NavLink = ({
        href,
        children,
    }: {
        href: string;
        children: React.ReactNode;
    }) => {
        const isActive = url.startsWith(href);
        return (
            <Link
                href={href}
                className={`relative px-3 py-2 text-blue-300 transition-all duration-300 hover:text-yellow-400 ${isActive ? 'text-yellow-400 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:animate-pulse after:bg-yellow-400 after:shadow-[0_0_10px_#facc15]' : ''} before:absolute before:inset-0 before:h-full before:w-full before:rounded-md before:bg-yellow-400/0 before:transition-all before:duration-300 hover:before:bg-yellow-400/10`}
            >
                {children}
            </Link>
        );
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-0 z-50 border-b border-yellow-400/20 bg-gray-800/50 backdrop-blur-sm"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <motion.div
                        className="flex items-center"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Link
                            href="/"
                            className="glitch-effect text-2xl font-bold text-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.3)]"
                        >
                            CyberPaste
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden space-x-8 md:flex">
                        {user ? (
                            <>
                                <NavLink href="/dashboard">Dashboard</NavLink>
                                <NavLink href="/pastes/create">
                                    Create Paste
                                </NavLink>
                                <div className="group relative">
                                    <div className="relative">
                                        <button className="flex items-center space-x-2 rounded-md px-3 py-2 text-blue-300 transition-all duration-300 hover:bg-yellow-400/10 hover:text-yellow-400">
                                            <span>{user.name}</span>
                                            <svg
                                                className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                        <div className="absolute -bottom-2 h-2 w-full" />
                                    </div>
                                    <div className="absolute right-0 mt-2 hidden w-48 rounded-md border border-yellow-400/20 bg-gray-800/90 py-1 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:block group-hover:opacity-100">
                                        <Link
                                            href="/profile"
                                            className="block w-full px-4 py-2 text-left text-blue-300 transition-all duration-300 hover:bg-yellow-400/10 hover:text-yellow-400"
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="block w-full px-4 py-2 text-left text-blue-300 transition-all duration-300 hover:bg-yellow-400/10 hover:text-yellow-400"
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-md border border-blue-300/20 px-4 py-2 text-blue-300 transition-all duration-300 hover:border-yellow-400/50 hover:text-yellow-400 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]"
                                >
                                    Login
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-md bg-yellow-400 px-4 py-2 text-black transition-all duration-300 hover:bg-yellow-300 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="flex md:hidden"
                    >
                        <div className="text-blue-300 transition-colors hover:text-yellow-400">
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </div>
                    </motion.button>
                </div>
            </div>

            {/* Mobile menu */}
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                    opacity: isMobileMenuOpen ? 1 : 0,
                    height: isMobileMenuOpen ? 'auto' : 0,
                }}
                className="border-t border-yellow-400/20 bg-gray-800/90 backdrop-blur-sm md:hidden"
            >
                {user ? (
                    <div className="space-y-1 p-3">
                        <Link
                            href="/dashboard"
                            className="block rounded-md px-3 py-2 text-blue-300 transition-all duration-300 hover:bg-yellow-400/10 hover:text-yellow-400"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/pastes/create"
                            className="block rounded-md px-3 py-2 text-blue-300 transition-all duration-300 hover:bg-yellow-400/10 hover:text-yellow-400"
                        >
                            Create Paste
                        </Link>
                        <Link
                            href="/profile"
                            className="block rounded-md px-3 py-2 text-blue-300 transition-all duration-300 hover:bg-yellow-400/10 hover:text-yellow-400"
                        >
                            Profile
                        </Link>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="block w-full rounded-md px-3 py-2 text-left text-blue-300 transition-all duration-300 hover:bg-yellow-400/10 hover:text-yellow-400"
                        >
                            Logout
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-2 p-3">
                        <Link
                            href={route('login')}
                            className="block rounded-md px-3 py-2 text-blue-300 transition-all duration-300 hover:bg-yellow-400/10 hover:text-yellow-400"
                        >
                            Login
                        </Link>
                        <Link
                            href={route('register')}
                            className="block rounded-md px-3 py-2 text-blue-300 transition-all duration-300 hover:bg-yellow-400/10 hover:text-yellow-400"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </motion.div>
        </motion.nav>
    );
}
