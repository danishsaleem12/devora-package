//src/app/carrers/roles/[slug]/page.js

import RoleDetail from "@/components/RoleDetail";

export default async function RoleDetailPage({ params }) {
    const { slug } = await params;

    return (
        <div className="flex min-h-screen flex-col">
            <RoleDetail slug={slug} />
        </div>
    );
}