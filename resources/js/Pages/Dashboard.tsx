import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageWrapper from '@/Components/PageWrapper';
import { PageProps } from '@/types';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <PageWrapper title="Dashboard">
                {/* Your page content here */}
                <div className="text-gray-100">
                    Welcome to your dashboard!
                </div>
            </PageWrapper>
        </AuthenticatedLayout>
    );
}
