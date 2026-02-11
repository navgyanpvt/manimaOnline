import ServicePackageDetail from '@/components/ServicePackageDetail';

export async function generateStaticParams() {
    // Generate params for services 1 to 4 (as seen in Steps)
    return [
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
    ];
}

export default async function ServicePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id
    return <ServicePackageDetail serviceId={id} />;
}
