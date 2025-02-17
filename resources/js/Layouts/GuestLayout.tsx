import Navbar from '@/Components/Navbar';
import { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gray-900 font-['Orbitron']">
            <Navbar user={null} />

            <main className="flex min-h-[calc(100vh-9rem)] items-center justify-center p-6">
                <div className="mx-auto w-full max-w-2xl">{children}</div>
            </main>

            <footer className="bg-gray-800/50 px-6 py-4 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl text-center text-blue-300">
                    <p>© 2024 CyberPaste. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
