import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

interface Paste {
    slug: string;
    title: string | null;
    created_at: string;
}

interface Props {
    recentPastes: Paste[];
}

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
    recentPastes,
}: PageProps<{ laravelVersion: string; phpVersion: string }> & Props) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-900 py-8">
                <div className="mx-auto max-w-4xl px-4">
                    <div className="mb-12 text-center">
                        <h1 className="glitch-text mb-4 text-4xl font-bold text-yellow-400">
                            Cyber Paste
                        </h1>
                        <p className="mb-8 text-lg text-blue-300">
                            Share code snippets securely with password
                            protection and expiration
                        </p>
                        <Link
                            href="/pastes/create"
                            className="inline-block rounded-md bg-yellow-400 px-6 py-3 text-black transition duration-300 hover:bg-yellow-300"
                        >
                            Create New Paste
                        </Link>
                    </div>

                    {recentPastes.length > 0 && (
                        <div className="rounded-lg border border-yellow-400 bg-gray-800 p-6">
                            <h2 className="mb-4 text-xl font-bold text-yellow-400">
                                Recent Public Pastes
                            </h2>
                            <div className="space-y-4">
                                {recentPastes.map((paste) => (
                                    <Link
                                        key={paste.slug}
                                        href={`/pastes/${paste.slug}`}
                                        className="block rounded-md bg-gray-900 p-4 transition duration-300 hover:bg-gray-700"
                                    >
                                        <h3 className="mb-2 font-bold text-blue-300">
                                            {paste.title || 'Untitled Paste'}
                                        </h3>
                                        <div className="text-sm text-gray-400">
                                            Created{' '}
                                            {new Date(
                                                paste.created_at,
                                            ).toLocaleString()}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
