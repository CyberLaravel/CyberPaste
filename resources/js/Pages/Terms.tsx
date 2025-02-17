import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function Terms() {
    return (
        <GuestLayout>
            <Head title="Terms of Service" />
            <div className="space-y-6 rounded-lg bg-gray-800/50 p-8 backdrop-blur-sm">
                <h2 className="glitch-effect text-2xl font-bold text-yellow-400">
                    Terms of Service
                </h2>

                <div className="space-y-4 text-gray-300">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>

                    <section className="space-y-2">
                        <h3 className="text-lg font-semibold text-blue-300">
                            1. Acceptance of Terms
                        </h3>
                        <p>
                            By accessing and using CyberPaste, you agree to be
                            bound by these Terms of Service.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h3 className="text-lg font-semibold text-blue-300">
                            2. User Responsibilities
                        </h3>
                        <p>
                            You are responsible for all content you post and
                            share through our service.
                        </p>
                        <ul className="list-inside list-disc space-y-1 pl-4">
                            <li>Do not share malicious code</li>
                            <li>Respect intellectual property rights</li>
                            <li>Do not share sensitive personal information</li>
                            <li>
                                Do not use the service for illegal activities
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-2">
                        <h3 className="text-lg font-semibold text-blue-300">
                            3. Content Guidelines
                        </h3>
                        <p>
                            All content must comply with our guidelines and
                            applicable laws.
                        </p>
                    </section>
                </div>
            </div>
        </GuestLayout>
    );
}
