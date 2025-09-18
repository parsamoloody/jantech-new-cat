import { Locale } from "@/lib/i18n.config";
import { FaStar, FaRocket, FaCogs, FaGlobe } from "react-icons/fa";

const timelineDataByLang = {
    en: [
        {
            year: "2010",
            icon: <FaRocket className="text-white text-xl" />,
            title: "Start of Operations",
            description: "Our brand began with limited production and a local market."
        },
        {
            year: "2015",
            icon: <FaCogs className="text-white text-xl" />,
            title: "Production Line Expansion",
            description: "Expanded our product line and entered the online market."
        },
        {
            year: "2020",
            icon: <FaStar className="text-white text-xl" />,
            title: "Quality Award Winner",
            description: "Our products won the national quality award."
        },
        {
            year: "2024",
            icon: <FaGlobe className="text-white text-xl" />,
            title: "Global Market Entry",
            description: "Began exporting products to Europe and Asia."
        }
    ],
    fa: [
        {
            year: "2010",
            icon: <FaRocket className="text-white text-xl" />,
            title: "شروع فعالیت",
            description: "برند ما با تولید محدود و بازار محلی آغاز به کار کرد."
        },
        {
            year: "2015",
            icon: <FaCogs className="text-white text-xl" />,
            title: "گسترش خط تولید",
            description: "خط تولید خود را گسترش دادیم و وارد بازار آنلاین شدیم."
        },
        {
            year: "2020",
            icon: <FaStar className="text-white text-xl" />,
            title: "برنده جایزه کیفیت",
            description: "محصولات ما برنده جایزه ملی کیفیت شد."
        },
        {
            year: "2024",
            icon: <FaGlobe className="text-white text-xl" />,
            title: "ورود به بازار جهانی",
            description: "صادرات محصولات به اروپا و آسیا آغاز شد."
        }
    ],
    ar: [
        {
            year: "2010",
            icon: <FaRocket className="text-white text-xl" />,
            title: "بدء العمليات",
            description: "بدأت علامتنا التجارية بإنتاج محدود وسوق محلي."
        },
        {
            year: "2015",
            icon: <FaCogs className="text-white text-xl" />,
            title: "توسيع خط الإنتاج",
            description: "قمنا بتوسيع خط إنتاجنا ودخلنا السوق الإلكتروني."
        },
        {
            year: "2020",
            icon: <FaStar className="text-white text-xl" />,
            title: "الفوز بجائزة الجودة",
            description: "فازت منتجاتنا بجائزة الجودة الوطنية."
        },
        {
            year: "2024",
            icon: <FaGlobe className="text-white text-xl" />,
            title: "دخول السوق العالمي",
            description: "بدأنا تصدير المنتجات إلى أوروبا وآسيا."
        }
    ],
    tr: [
        {
            year: "2010",
            icon: <FaRocket className="text-white text-xl" />,
            title: "Operasyonların Başlangıcı",
            description: "Markamız sınırlı üretim ve yerel pazar ile başladı."
        },
        {
            year: "2015",
            icon: <FaCogs className="text-white text-xl" />,
            title: "Üretim Hattı Genişlemesi",
            description: "Ürün yelpazemizi genişlettik ve online pazara girdik."
        },
        {
            year: "2020",
            icon: <FaStar className="text-white text-xl" />,
            title: "Kalite Ödülü Kazananı",
            description: "Ürünlerimiz ulusal kalite ödülünü kazandı."
        },
        {
            year: "2024",
            icon: <FaGlobe className="text-white text-xl" />,
            title: "Küresel Pazara Giriş",
            description: "Avrupa ve Asya'ya ürün ihracatına başladık."
        }
    ],
    ru: [
        {
            year: "2010",
            icon: <FaRocket className="text-white text-xl" />,
            title: "Начало работы",
            description: "Наш бренд начал с ограниченного производства и локального рынка."
        },
        {
            year: "2015",
            icon: <FaCogs className="text-white text-xl" />,
            title: "Расширение производственной линии",
            description: "Мы расширили нашу линейку продуктов и вышли на онлайн-рынок."
        },
        {
            year: "2020",
            icon: <FaStar className="text-white text-xl" />,
            title: "Победитель премии качества",
            description: "Наша продукция получила национальную премию качества."
        },
        {
            year: "2024",
            icon: <FaGlobe className="text-white text-xl" />,
            title: "Выход на мировой рынок",
            description: "Начали экспорт продукции в Европу и Азию."
        }
    ]
};

export default async function GrowRoad({lang}: {lang: Locale}) {
    const timelineData = timelineDataByLang[lang] || timelineDataByLang.en;
    
    return (
        <section className="px-4">
            <h2 className="text-2xl font-bold text-center mb-16">
                {lang === 'fa' ? 'مسیر رشد برند ما' :
                 lang === 'tr' ? 'Markamızın Büyüme Yolculuğu' :
                 'Our Brand Growth Journey'}
            </h2>
            <div className="relative max-w-5xl mx-auto before:content-[''] before:absolute before:top-0 before:left-1/2 before:transform before:-translate-x-1/2 before:w-1 before:h-full before:bg-black">
                {timelineData.map((event, index) => {
                    const isLeft = index % 2 === 0;
                    return (
                        <div
                            key={index}
                            className="mb-12 flex flex-col md:grid md:grid-cols-9 md:items-center"
                        >
                            <div className={`relative z-30 bg-white p-4 md:col-span-4 px-4 shadow hover:shadow-lg transition duration-300 ${isLeft ? 'md:order-1' : 'md:order-3'}`}>
                                <div className="text-center">
                                    <h4 className="sm:text-black text-lg lg:text-[20px] font-bold mb-1">{event.year} - {event.title}</h4>
                                    <p className="sm:text-gray-600 text-sm">{event.description}</p>
                                </div>
                            </div>

                            <div className="md:col-span-1 flex justify-center relative z-10 order-2 my-4 md:my-0">
                                <div className="w-10 h-10 rounded-full bg-red-primary text-white flex items-center justify-center shadow-md">
                                    {event.icon}
                                </div>
                            </div>

                            <div className={`md:col-span-4 px-4 ${isLeft ? 'md:order-3' : 'md:order-1 hidden md:block'}`} />
                        </div>
                    );
                })}
            </div>
        </section>
    )
}