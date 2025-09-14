import Image from 'next/image';
import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '@/lib/i18n.config';
import ShareButton from '@/components/ShareButton';
import { Category } from '@/types';

interface Props {
    params: Promise<{ lang: Locale; category: Category; id: string; }>;
}

export default async function ProductPage({
    params,
}: Props) {
    const { lang, category, id } = await params;
    const t = (await getDictionary(lang)).productPage;

    const  data = await fetch(`https://smartcd.vercel.app/api/products?lang=${lang}&category=${category}&id=${id}`).then(res => res.json());
    console.log("image:", data[0].image);
    if (!t || !data[0]) return null;

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
                    />
                </div>

                <div className="mt-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        {data[0].name}
                    </h1>

                    {/* <div className="mt-3 flex items-center gap-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    className="h-5 w-5 text-yellow-400"
                                />
                            ))}
                        </div>
                        <p className="ml-3 text-gray-500 font-sans font-semibold">150 {data[0].reviews}</p>
                    </div> */}

                    <div className="mt-4">
                        <p className="text-3xl tracking-tight text-gray-900">{Number(data[0].price).toLocaleString(lang)}</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-base text-gray-500">{data[0].description}</p>
                    </div>

                    <div className="mt-8">
                        {/* <h3 className="text-lg font-medium text-gray-900">{t.features}</h3> */}
                        <div className="mt-4 space-y-4">
                            {data[0].features.map((feature: { id: string; key: string; value: string; }) => (
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
                        dangerouslySetInnerHTML={{ __html: data[0].detailContent }}
                    ></div>
                </div>
            </div>
        </div>
    );
};
