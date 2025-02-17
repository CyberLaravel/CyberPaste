import PageWrapper from '@/Components/PageWrapper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

interface Props {
    mustVerifyEmail: boolean;
    status?: string;
}

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
}: Props & PageProps) {
    if (!auth.user) {
        return null; // or redirect to login
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Profile" />

            <div className="space-y-6">
                <PageWrapper title="Profile Information">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>
                </PageWrapper>

                <PageWrapper title="Update Password">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </PageWrapper>

                <PageWrapper title="Delete Account">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </PageWrapper>
            </div>
        </AuthenticatedLayout>
    );
}
