import ErrorBoundary from '@/Components/ErrorBoundary';
import GuestPaste from '@/Components/GuestPaste';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import Prism from 'prismjs';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-markup'; // For HTML/XML
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-yaml';
import 'prismjs/themes/prism-tomorrow.css';
import { useEffect, useState } from 'react';

interface Paste {
    id: string;
    title: string;
    content: string;
    language: string;
    created_at: string;
    expires_at: string | null;
    has_password: boolean;
    slug: string;
}

interface Props extends PageProps {
    paste: Paste;
}

export default function Show({ auth, paste: initialPaste }: Props) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [copyStatus, setCopyStatus] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            Prism.highlightAll();
        }, 100);
    }, [initialPaste.content]);

    if (!auth.user) {
        return <GuestPaste />;
    }

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);
        try {
            await router.post(
                `/api/pastes/${initialPaste.slug}/verify`,
                { password },
                {
                    onError: (errors) => {
                        setError(errors.password || 'Invalid password');
                        setIsVerifying(false);
                    },
                },
            );
        } catch (error) {
            setError('Something went wrong');
            setIsVerifying(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(initialPaste.content);
            setCopyStatus('Copied!');
            setTimeout(() => setCopyStatus(''), 2000);
        } catch (error) {
            console.error('Copy failed:', error);
            // Fallback method
            const textarea = document.createElement('textarea');
            textarea.value = initialPaste.content;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                setCopyStatus('Copied!');
            } catch (e) {
                setCopyStatus('Failed to copy');
            }
            document.body.removeChild(textarea);
            setTimeout(() => setCopyStatus(''), 2000);
        }
    };

    if (initialPaste.content === '[Protected Content]') {
        return (
            <ErrorBoundary>
                <AuthenticatedLayout user={auth.user}>
                    <Head title="Password Protected Paste" />
                    <div className="space-y-6 bg-gray-800/50 p-8 backdrop-blur-sm">
                        <h2 className="glitch-effect text-2xl font-bold text-yellow-400">
                            Password Protected Paste
                        </h2>
                        <form
                            onSubmit={handlePasswordSubmit}
                            className="space-y-4"
                        >
                            <input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isVerifying}
                                className="w-full bg-gray-900/50 px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 disabled:opacity-50"
                            />
                            {error && (
                                <div className="text-sm text-red-500">
                                    {error}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={isVerifying}
                                className="bg-yellow-400 px-6 py-2 text-black transition-colors hover:bg-yellow-300 disabled:opacity-50"
                            >
                                {isVerifying ? 'Verifying...' : 'Unlock Paste'}
                            </button>
                        </form>
                    </div>
                </AuthenticatedLayout>
            </ErrorBoundary>
        );
    }

    return (
        <ErrorBoundary>
            <AuthenticatedLayout user={auth.user}>
                <Head title={initialPaste.title || 'View Paste'} />
                <article className="space-y-6 bg-gray-800/50 p-8 backdrop-blur-sm">
                    {initialPaste.title && (
                        <h2 className="glitch-effect text-2xl font-bold text-yellow-400">
                            {initialPaste.title}
                        </h2>
                    )}

                    <div className="flex flex-wrap gap-4 text-sm text-blue-300">
                        <span>Language: {initialPaste.language}</span>
                        <span>
                            Created:{' '}
                            {new Date(
                                initialPaste.created_at,
                            ).toLocaleDateString()}
                        </span>
                        {initialPaste.expires_at && (
                            <span>
                                Expires:{' '}
                                {new Date(
                                    initialPaste.expires_at,
                                ).toLocaleDateString()}
                            </span>
                        )}
                    </div>

                    <pre className="overflow-x-auto bg-gray-900/50 p-6">
                        <code
                            className={`language-${initialPaste.language} text-gray-100`}
                        >
                            {initialPaste.content}
                        </code>
                    </pre>

                    <div className="flex justify-end gap-4">
                        <button
                            onClick={handleCopy}
                            className="text-blue-300 transition-colors hover:text-yellow-400"
                        >
                            {copyStatus || 'Copy to Clipboard'}
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="text-blue-300 transition-colors hover:text-yellow-400"
                        >
                            Print
                        </button>
                    </div>
                </article>
            </AuthenticatedLayout>
        </ErrorBoundary>
    );
}
