import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gray-900 font-['Orbitron']">
            {/* Navbar */}
            <nav className="bg-gray-800/50 px-6 py-4 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            className="glitch-effect relative text-2xl font-bold text-yellow-400"
                        >
                            CyberApp
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex min-h-[calc(100vh-9rem)] items-center justify-center p-6">
                <div className="mx-auto w-full max-w-2xl space-y-6 bg-gray-800/50 p-8 backdrop-blur-sm">
                    {children}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800/50 px-6 py-4 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl text-center text-blue-300">
                    <p>© 2024 CyberApp. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
