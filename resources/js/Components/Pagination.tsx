import { Link } from '@inertiajs/react';

interface Props {
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export default function Pagination({ links }: Props) {
    return (
        <div className="flex justify-center gap-2">
            {links.map((link, i) => {
                if (!link.url && !link.active) return null;

                return (
                    <Link
                        key={i}
                        href={link.url || ''}
                        className={`px-4 py-2 transition-colors ${
                            link.active
                                ? 'bg-yellow-400 text-black'
                                : 'bg-gray-800/50 text-blue-300 hover:bg-gray-800 hover:text-yellow-400'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            })}
        </div>
    );
}
