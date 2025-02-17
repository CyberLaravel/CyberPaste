import PageWrapper from '@/Components/PageWrapper';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, router } from '@inertiajs/react';
import type { DebouncedFunc } from 'lodash';
import { debounce } from 'lodash';
import { useState } from 'react';

interface Paste {
    id: string;
    slug: string;
    title: string;
    language: string;
    created_at: string;
    expires_at: string | null;
    has_password: boolean;
}

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        } | null;
        flash?: {
            message?: string;
        };
    };
    pastes: PaginatedData<Paste>;
    filters?: {
        search?: string;
        language?: string;
        sort?: string;
    };
}

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

export default function Dashboard({ auth, pastes, filters = {} }: Props) {
    const defaultFilters = {
        search: '',
        language: '',
        sort: 'newest',
    };

    const currentFilters = { ...defaultFilters, ...filters };

    const [deletingPaste, setDeletingPaste] = useState<string | null>(null);
    const [search, setSearch] = useState(currentFilters.search);
    const [language, setLanguage] = useState(currentFilters.language);
    const [sort, setSort] = useState(currentFilters.sort);

    const handleDelete = (slug: string) => {
        if (confirm('Are you sure you want to delete this paste?')) {
            router.delete(route('pastes.destroy', slug), {
                onSuccess: () => {
                    setDeletingPaste(null);
                },
            });
        }
    };

    const updateFilters: DebouncedFunc<
        (newFilters: Partial<typeof filters>) => void
    > = debounce((newFilters) => {
        router.get(
            route('dashboard'),
            { ...filters, ...newFilters },
            { preserveState: true },
        );
    }, 300);

    if (!auth.user) {
        return null;
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <PageWrapper title="Dashboard">
                <div className="space-y-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-xl font-bold text-gray-100">
                            Your Pastes
                        </h2>
                        <Link
                            href={route('pastes.create')}
                            className="bg-yellow-400 px-4 py-2 text-black transition-colors hover:bg-yellow-300"
                        >
                            Create New Paste
                        </Link>
                    </div>

                    <div className="grid gap-4 rounded-lg bg-gray-800/50 p-4 backdrop-blur-sm md:grid-cols-3">
                        <div>
                            <input
                                type="text"
                                placeholder="Search pastes..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    updateFilters({ search: e.target.value });
                                }}
                                className="w-full bg-gray-900/50 px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                            />
                        </div>
                        <div>
                            <select
                                value={language}
                                onChange={(e) => {
                                    setLanguage(e.target.value);
                                    updateFilters({ language: e.target.value });
                                }}
                                className="w-full bg-gray-900/50 px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                            >
                                <option value="">All Languages</option>
                                {Object.entries(LANGUAGE_OPTIONS).map(
                                    ([value, label]) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ),
                                )}
                            </select>
                        </div>
                        <div>
                            <select
                                value={sort}
                                onChange={(e) => {
                                    setSort(e.target.value);
                                    updateFilters({ sort: e.target.value });
                                }}
                                className="w-full bg-gray-900/50 px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="title">Title A-Z</option>
                                <option value="title-desc">Title Z-A</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {pastes.data.map((paste) => (
                            <div
                                key={paste.id}
                                className="relative rounded-lg bg-gray-800/50 p-4 backdrop-blur-sm transition-colors hover:bg-gray-800"
                            >
                                <Link
                                    href={route('pastes.show', paste.slug)}
                                    className="block space-y-2"
                                >
                                    <h3 className="font-bold text-yellow-400">
                                        {paste.title || 'Untitled Paste'}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 text-sm text-blue-300">
                                        <span>{paste.language}</span>
                                        {paste.has_password && (
                                            <span>🔒 Password Protected</span>
                                        )}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        Created:{' '}
                                        {new Date(
                                            paste.created_at,
                                        ).toLocaleDateString()}
                                        {paste.expires_at && (
                                            <div>
                                                Expires:{' '}
                                                {new Date(
                                                    paste.expires_at,
                                                ).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                                <button
                                    onClick={() => handleDelete(paste.slug)}
                                    disabled={deletingPaste === paste.slug}
                                    className="absolute right-2 top-2 p-2 text-red-500 transition-colors hover:text-red-400 disabled:opacity-50"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    {pastes.last_page > 1 && (
                        <div className="mt-6">
                            <Pagination links={pastes.links} />
                        </div>
                    )}

                    {auth.flash?.message && (
                        <div className="fixed bottom-4 right-4 rounded-lg bg-green-500 p-4 text-white shadow-lg">
                            {auth.flash.message}
                        </div>
                    )}
                </div>
            </PageWrapper>
        </AuthenticatedLayout>
    );
}
