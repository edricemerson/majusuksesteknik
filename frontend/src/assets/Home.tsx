import { useEffect, useRef } from "react";
import type { ComponentType } from "react";
import carousel2 from "../photo/carousel2.png";
import carousel3 from "../photo/carousel3.png";
import carousel4 from "../photo/carousel4.png";
import { ShieldCheck, Truck, Wrench, HeadphonesIcon } from "lucide-react";
import whatsappIcon from "../photo/whatsapp.svg";
import tokopedia from "../photo/tokopedia.svg";
import shopee from "../photo/shopee.svg";
import lazada from "../photo/lazada.svg";

const slides = [carousel2, carousel3, carousel4];

const whyUs = [
    {
        icon: ShieldCheck,
        title: "Certified Products",
        desc: "All products are certified and guaranteed original because we are an official distributor.",
    },
    {
        icon: Truck,
        title: "Fast Delivery",
        desc: "We ship to all over Indonesia with fast and reliable logistics provided by our e-commerce partners or you can order by using WhatsApp",
        extraIcon: whatsappIcon,
    },
    {
        icon: Wrench,
        title: "Wide-range of product",
        desc: "We offer many products from power tools, industrial tools and many more. See our products here!",
        extraIcons: [
            { src: tokopedia, href: "https://www.tokopedia.com/majusuksesteknik", className: "bg-green-600 border-green-500 hover:bg-green-700" },
            { src: shopee, href: "https://shopee.co.id/maju_sukses_teknik", className: "bg-orange-500 border-orange-400 hover:bg-orange-600" },
            { src: lazada, href: "https://www.lazada.co.id/shop/maju-sukses-teknik/?itemId=5847514794&spm=a2o4j.pdp_revamp.seller.1.57344552WOk8Py&path=promotion-440615-0.htm&tab=promotion&channelSource=pdp", className: "bg-blue-700 border-blue-600 hover:bg-blue-800" },
        ]
    },
    {
        icon: HeadphonesIcon,
        title: "Quality",
        desc: "Every product sent-out has undergoes QC to ensure customer satisfaction",
    },
];

type WhyUsItem = {
    icon: ComponentType<{ className?: string }>;
    title: string;
    desc: string;
    extraIcon?: string;
    extraIcons?: { src: string; href: string; className: string }[];
};

function WhyUsCard({ icon: Icon, title, desc, extraIcon, extraIcons }: WhyUsItem) {
    return (
        <div className="relative bg-slate-900/70 backdrop-blur-sm
            border border-slate-700/50 rounded-xl p-5 flex flex-col
            items-center text-center hover:-translate-y-1 hover:border-blue-500/30
            hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300"
        >
            <div className="absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent" />
            <div className="w-12 h-12 rounded-full bg-blue-600/20 ring-1 ring-blue-500/20 flex items-center justify-center mb-3">
                <Icon className="text-blue-400 w-8 h-8" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
            <p className="text-slate-400 leading-relaxed">{desc}</p>
            {extraIcon && (
                <a href="https://wa.me/628113389098" target="_blank" rel="noreferrer">
                    <img src={extraIcon} className="w-10 h-10 p-2 mt-2 bg-green-700 rounded-xl border-green-600 border-2
                    transition duration-300 ease-in-out hover:bg-green-800" />
                </a>
            )}
            {extraIcons && (
                <div className="flex items-center gap-2 mt-2">
                    {extraIcons.map((icon, index) => (
                        <a key={index} href={icon.href} target="_blank" rel="noreferrer">
                            <img src={icon.src}
                                className={`w-10 h-10 p-2 rounded-xl border-2
                                transition duration-300 ease-in-out ${icon.className}`}
                            />
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

function Home() {
    const trackRef = useRef<HTMLDivElement>(null);
    const posRef = useRef(0);
    const rafRef = useRef<number>(0);

    const infinite = [...slides, ...slides];

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const slideWidth = window.innerWidth * slides.length;
        const speed = 0.8;

        const animate = () => {
            posRef.current += speed;
            if (posRef.current >= slideWidth) {
                posRef.current = 0;
            }
            track.style.transform = `translateX(-${posRef.current}px)`;
            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    return (

        <div className="w-full">
            <section id="home" />
            <div className="relative w-full h-120 sm:h-140 lg:h-[calc(100vh-64px)] overflow-hidden bg-black">
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-black/20 to-black/65 z-10 pointer-events-none" />

                {/* Fill top gap */}
                <div className="absolute top-0 left-0 right-0 bg-slate-900 z-20 pointer-events-none" style={{ height: "4%" }} />

                {/* Top shadow */}
                <div className="absolute left-0 right-0 bg-linear-to-b from-slate-900 to-transparent z-20 pointer-events-none" style={{ top: "4%", bottom: "40%" }} />

                {/* Bottom shadow */}
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-slate-900 to-transparent z-20 pointer-events-none" style={{ top: "70%" , bottom: "4%"}} />

                {/* Fill bottom gap */}
                <div className="absolute bottom-0 left-0 right-0 bg-slate-900 z-20 pointer-events-none" style={{ height: "4%" }} />

                {/* Center Content */}
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-blue-100 to-blue-300 drop-shadow-lg pb-3">
                        Maju Sukses Teknik
                    </h1>
                    <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                        Your trusted source for professional power tools and industrial equipment.
                    </p>

                    {/* Why Choose Us Cards (desktop: overlaid on hero) */}
                    <div className="hidden lg:grid mt-10 grid-cols-4 gap-4 w-full max-w-7xl">
                        {whyUs.map((item) => (
                            <WhyUsCard key={item.title} {...item} />
                        ))}
                    </div>
                </div>

                {/* Sliding Track */}
                <div ref={trackRef} className="flex h-full will-change-transform"
                    style={{ width: `${infinite.length * 100}vw` }}
                >
                    {infinite.map((src, i) => (
                        <div key={i} className="h-full" style={{ width: "100vw", flexShrink: 0 }}>
                            <img src={src} alt={`Slide ${(i % slides.length) + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Why Choose Us Cards (mobile/tablet: normal flow below hero) */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 py-8 bg-slate-900">
                {whyUs.map((item) => (
                    <WhyUsCard key={item.title} {...item} />
                ))}
            </div>
        </div>
    );
}

export default Home;