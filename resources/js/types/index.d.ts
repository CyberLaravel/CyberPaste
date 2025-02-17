import { Config } from 'ziggy-js';

declare global {
    function route(
        name: string,
        params?: string | Record<string, string | number | boolean>,
    ): string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User | null;
        flash?: {
            message?: string;
        };
    };
    ziggy: Config & { location: string };
};
