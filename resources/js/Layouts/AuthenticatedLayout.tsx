import { User } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, useState } from 'react';

interface Props extends PropsWithChildren {
    user: User | null;
}

export default function AuthenticatedLayout({ user, children }: Props) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-900 font-['Orbitron']">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-gray-800/50 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex h-20 items-center justify-between">
                        <div className="flex items-center">
                            <Link
                                href="/dashboard"
                                className="glitch-effect text-2xl font-bold text-yellow-400"
                            >
                                CyberApp
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="ml-12 hidden space-x-10 md:flex">
                                <NavLink href="/dashboard">Dashboard</NavLink>
                                <NavLink href="/profile">Profile</NavLink>
                            </div>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center">
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setIsMobileMenuOpen(!isMobileMenuOpen)
                                    }
                                    className="flex items-center space-x-3 text-blue-300 transition-colors hover:text-yellow-400"
                                >
                                    <span>{user?.name}</span>
                                    <svg
                                        className="h-5 w-5"
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

                                {isMobileMenuOpen && (
                                    <div className="absolute right-0 mt-3 w-48 bg-gray-800/90 p-1 backdrop-blur-sm">
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="w-full px-6 py-3 text-left text-blue-300 transition-colors hover:bg-yellow-400/10 hover:text-yellow-400"
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="mx-auto min-h-[calc(100vh-9rem)] max-w-7xl px-6 py-8">
                <div className="grid gap-6">{children}</div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800/50 px-6 py-4 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl text-center text-blue-300">
                    <p>© 2024 CyberApp. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

// NavLink Component
function NavLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    const { url } = usePage();
    const isActive = url.startsWith(href);

    return (
        <Link
            href={href}
            className={`relative px-1 py-2 text-blue-300 transition-colors hover:text-yellow-400 ${isActive ? 'text-yellow-400 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-yellow-400 after:shadow-[0_0_10px_#facc15]' : ''}`}
        >
            {children}
        </Link>
    );
}
