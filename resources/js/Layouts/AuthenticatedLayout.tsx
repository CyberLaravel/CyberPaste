import Navbar from '@/Components/Navbar';
import { User } from '@/types';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    user: User | null;
}

export default function AuthenticatedLayout({ user, children }: Props) {
    return (
        <div className="min-h-screen bg-gray-900 font-['Orbitron']">
            <Navbar user={user} />

            <main className="mx-auto min-h-[calc(100vh-9rem)] max-w-7xl px-6 py-8">
                {children}
            </main>

            <footer className="bg-gray-800/50 px-6 py-4 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl text-center text-blue-300">
                    <p>© 2024 CyberPaste. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
