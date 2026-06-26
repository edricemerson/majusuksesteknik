import { useEffect, useRef } from "react";
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
            { src: tokopedia, className: "bg-green-600 border-green-500 hover:bg-green-700" },
            { src: shopee, className: "bg-orange-500 border-orange-400 hover:bg-orange-600" },
            { src: lazada, className: "bg-blue-700 border-blue-600 hover:bg-blue-800" },
        ]
    },
    {
        icon: HeadphonesIcon,
        title: "Quality",
        desc: "Every product sent-out has undergoes QC to ensure customer satisfaction",
    },
];

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
        
        <div className="w-full" style={{ height: "calc(100vh - 64px)" }}>
            <section id="home" />
            <div className="relative w-full h-full overflow-hidden bg-black">
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
                    <h1 className="text-white text-5xl font-bold">
                        Maju Sukses Teknik
                    </h1>
                    <p className="mt-4 text-slate-200 text-lg max-w-2xl">
                        Your trusted source for professional power tools and industrial equipment.
                    </p>

                    {/* Why Choose Us Cards */}
                    <div className="mt-10 grid grid-cols-4 gap-4 w-full max-w-7xl">
                        {whyUs.map(({ icon: Icon, title, desc, extraIcon, extraIcons }) => (
                            <div key={title} className="bg-slate-900/70 backdrop-blur-sm 
                                border border-slate-700/50 rounded-xl p-5 flex flex-col 
                                items-center text-center"
                            >
                                <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center mb-3">
                                    <Icon className="text-blue-400 w-8 h-8" />
                                </div>
                                <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
                                <p className="text-slate-400 leading-relaxed">{desc}</p>
                                {extraIcon && (
                                    <img src={extraIcon} className="w-10 h-10 p-2 mt-2 bg-green-700 rounded-xl border-green-600 border-2
                                    transition duration-300 ease-in-out hover:bg-green-800" />
                                )}
                                {extraIcons && (
                                    <div className="flex items-center gap-2 mt-2">
                                        {extraIcons.map((icon, index) => (
                                            <img key={index} src={icon.src}
                                                className={`w-10 h-10 p-2 rounded-xl border-2 
                                                transition duration-300 ease-in-out ${icon.className}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
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
                                className="w-full h-full object-fill"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;