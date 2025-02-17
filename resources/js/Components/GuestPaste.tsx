import { Link } from '@inertiajs/react';

export default function GuestPaste() {
    return (
        <div className="min-h-screen bg-gray-900 p-6 font-['Orbitron']">
            <div className="space-y-6 bg-gray-800/50 p-8 backdrop-blur-sm">
                <h2 className="glitch-effect text-2xl font-bold text-yellow-400">
                    Authentication Required
                </h2>
                <p className="text-gray-100">
                    Please{' '}
                    <Link
                        href={route('login')}
                        className="text-blue-300 hover:text-yellow-400"
                    >
                        log in
                    </Link>{' '}
                    to view this paste.
                </p>
            </div>
        </div>
    );
}
