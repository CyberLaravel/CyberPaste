import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    title?: string;
}

export default function PageWrapper({ children, title }: Props) {
    return (
        <div className="rounded-lg border border-yellow-400 bg-gray-800 p-8 shadow-[0_0_15px_rgba(250,204,21,0.1)]">
            {title && (
                <h2 className="glitch-effect mb-6 text-2xl font-bold text-yellow-400">
                    {title}
                </h2>
            )}
            <div className="space-y-6">
                {children}
            </div>
        </div>
    );
}
