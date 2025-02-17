import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function Privacy() {
    return (
        <GuestLayout>
            <Head title="Privacy Policy" />
            <div className="space-y-6 rounded-lg bg-gray-800/50 p-8 backdrop-blur-sm">
                <h2 className="glitch-effect text-2xl font-bold text-yellow-400">
                    Privacy Policy
                </h2>

                <div className="space-y-4 text-gray-300">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>

                    <section className="space-y-2">
                        <h3 className="text-lg font-semibold text-blue-300">
                            1. Information We Collect
                        </h3>
                        <p>
                            We collect information you provide directly to us
                            when using CyberPaste.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h3 className="text-lg font-semibold text-blue-300">
                            2. How We Use Your Information
                        </h3>
                        <ul className="list-inside list-disc space-y-1 pl-4">
                            <li>To provide and maintain our service</li>
                            <li>To notify you about changes</li>
                            <li>To provide customer support</li>
                            <li>To detect and prevent abuse</li>
                        </ul>
                    </section>

                    <section className="space-y-2">
                        <h3 className="text-lg font-semibold text-blue-300">
                            3. Data Security
                        </h3>
                        <p>
                            We implement appropriate security measures to
                            protect your data.
                        </p>
                    </section>
                </div>
            </div>
        </GuestLayout>
    );
}
