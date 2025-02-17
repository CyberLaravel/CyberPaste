import GuestPaste from '@/Components/GuestPaste';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const LANGUAGE_OPTIONS = {
    plain: 'Plain Text',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    python: 'Python',
    php: 'PHP',
    java: 'Java',
    csharp: 'C#',
    cpp: 'C++',
    css: 'CSS',
    html: 'HTML',
    sql: 'SQL',
    json: 'JSON',
    xml: 'XML',
    yaml: 'YAML',
    markdown: 'Markdown',
} as const;

const EXPIRATION_OPTIONS = {
    never: 'Never',
    '1h': '1 Hour',
    '1d': '1 Day',
    '1w': '1 Week',
    '1m': '1 Month',
    '1y': '1 Year',
} as const;

export default function Create({ auth }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        language: 'plain',
        expiration: 'never',
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('pastes.store'));
    };

    if (!auth.user) {
        return <GuestPaste />;
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Paste" />
            <form
                onSubmit={submit}
                className="space-y-6 bg-gray-800/50 p-8 backdrop-blur-sm"
            >
                <h2 className="glitch-effect text-2xl font-bold text-yellow-400">
                    Create New Paste
                </h2>

                {/* Title */}
                <div>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        placeholder="Title (Optional)"
                        className="w-full bg-gray-900/50 px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.title}
                        </p>
                    )}
                </div>

                {/* Content */}
                <div>
                    <textarea
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        placeholder="Paste your content here..."
                        rows={15}
                        required
                        className="w-full bg-gray-900/50 px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                    />
                    {errors.content && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.content}
                        </p>
                    )}
                </div>

                <div className="flex flex-wrap gap-6">
                    {/* Language */}
                    <div className="flex-1">
                        <select
                            value={data.language}
                            onChange={(e) =>
                                setData('language', e.target.value)
                            }
                            className="w-full bg-gray-900/50 px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                        >
                            {Object.entries(LANGUAGE_OPTIONS).map(
                                ([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ),
                            )}
                        </select>
                        {errors.language && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.language}
                            </p>
                        )}
                    </div>

                    {/* Expiration */}
                    <div className="flex-1">
                        <select
                            value={data.expiration}
                            onChange={(e) =>
                                setData('expiration', e.target.value)
                            }
                            className="w-full bg-gray-900/50 px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                        >
                            {Object.entries(EXPIRATION_OPTIONS).map(
                                ([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ),
                            )}
                        </select>
                        {errors.expiration && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.expiration}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="flex-1">
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            placeholder="Password (Optional)"
                            className="w-full bg-gray-900/50 px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-yellow-400 px-6 py-2 text-black transition-colors hover:bg-yellow-300 disabled:opacity-50"
                    >
                        Create Paste
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
