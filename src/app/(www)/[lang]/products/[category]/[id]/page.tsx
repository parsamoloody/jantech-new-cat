import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '@/lib/i18n.config';
import ShareButton from '@/components/ShareButton';
import { Category } from '@/types';

interface Props {
    params: Promise<{ lang: Locale; category: Category; id: string; }>;
}

async function getProductData(lang: Locale, category: Category, id: string) {
    try {
        const response = await fetch(
            `https://smartcdv2.vercel.app/api/products?lang=${lang}&category=${category}&id=${id}`,
            {
                next: { 
                    revalidate: 3600,
                    tags: [`product-${category}-${id}`]
                },
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch product:', error);
        return null;
    }
}

export default async function ProductPage({
    params,
}: Props) {
    const { lang, category, id } = await params;
    const t = (await getDictionary(lang)).productPage;
    
    if (!t) {
        notFound();
    }

    const data = await getProductData(lang, category, id);
    
    if (!data?.[0]) {
        notFound();
    }

    return (
        <div className="wrapper max-w-[1600px] mx-auto">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                <div className="relative w-full aspect-square lg:aspect-auto lg:h-full overflow-hidden">
                    <Image
                        src={data[0].image}
                        alt={data[0].name}
                        className="h-full w-full object-contain"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                <div className="mt-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        {data[0].name}
                    </h1>

                    <div className="mt-4">
                        <p className="text-3xl tracking-tight text-gray-900">
                            {Number(data[0].price).toLocaleString(lang)}
                        </p>
                    </div>

                    <div className="mt-6">
                        <p className="text-base text-gray-500">{data[0].description}</p>
                    </div>

                    <div className="mt-8">
                        <div className="mt-4 space-y-4">
                            {data[0].features?.map((feature: { id: string; key: string; value: string; }) => (
                                <div key={feature.id} className="flex items-center">
                                    <div className="text-sm font-medium text-gray-500">
                                        {feature.key}:
                                    </div>
                                    <div className="ml-3 text-sm text-gray-900">{feature.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <ShareButton
                        title={t.share}
                        text={`${data[0].name} - ${data[0].description}`}
                    />
                </div>

                <div className="mt-10 col-span-2">
                    <h3 className="text-lg font-medium text-gray-900">{t.productDetail}</h3>
                    <div
                        className="mt-4 prose prose-sm text-gray-500"
                        dangerouslySetInnerHTML={{ __html: data[0].detailContent || '' }}
                    />
                </div>
            </div>
        </div>
    );
}

// Optional: Generate metadata for SEO
export async function generateMetadata({
    params,
}: Props) {
    const { lang, category, id } = await params;
    const data = await getProductData(lang, category, id);
    
    if (!data?.[0]) {
        return {
            title: 'Product not found',
        };
    }

    const { name, description } = data[0];
    
    return {
        title: name,
        description: description,
        openGraph: {
            title: name,
            description: description,
            images: [data[0].image],
            type: 'website',
        },
    };
}

// Generate static params for better performance
export async function generateStaticParams() {
    // You can fetch all possible product paths here
    // This is optional but recommended for static generation
    return [];
}