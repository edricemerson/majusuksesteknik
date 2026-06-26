import { useEffect, useRef, useState } from "react";
import bandara from "../photo/bandara.png"
import telkom from "../photo/telkom.png"
import kaspari from "../photo/kaspari.jpg"
import tokoLOGO from "../photo/tokopediaLOGO.png"
import shopeeLOGO from "../photo/shopeeLOGO.png"
import lazadaLOGO from "../photo/lazadaLOGO.svg"

const words = "NRT PRO & Yamamax Pro Official Distributor".split(" ");

const PLAYLIST_SRC = "https://www.youtube.com/embed/videoseries?list=PLyhboHVyLQ9j_RdYuUT-Hr5uXAFdL_Tct";

function AboutUs() {
    const headerRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLDivElement>(null);
    const [headerVisible, setHeaderVisible] = useState(false);
    const [bodyVisible, setBodyVisible] = useState(false);
    const [videoVisible, setVideoVisible] = useState(false);

    useEffect(() => {
        const makeObserver = (setter: (v: boolean) => void, threshold = 0.2) =>
            new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setter(true); },
                { threshold }
            );

        const headerObs = makeObserver(setHeaderVisible);
        const bodyObs = makeObserver(setBodyVisible);
        const videoObs = makeObserver(setVideoVisible, 0.5);

        if (headerRef.current) headerObs.observe(headerRef.current);
        if (bodyRef.current) bodyObs.observe(bodyRef.current);
        if (videoRef.current) videoObs.observe(videoRef.current);

        return () => { headerObs.disconnect(); bodyObs.disconnect(); videoObs.disconnect(); };
    }, []);

    return (
        <div className="pb-16">
            <section id="about" />
            {/* Header row */}
            <div ref={headerRef} className="px-48 mt-6 flex items-center gap-8">
                <div className="shrink-0 flex flex-col gap-2">
                    <span
                        className={`text-xs font-bold tracking-[0.25em] uppercase text-blue-400
                            transition-all duration-500 ease-out
                            ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                        style={{ transitionDelay: "0ms" }}
                    >
                        Who We Are
                    </span>
                    <span
                        className={`text-5xl text-white font-semibold transition-all duration-500 ease-out
                            ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                        style={{ transitionDelay: "100ms" }}
                    >
                        About Us
                    </span>
                    <div
                        className="h-0.75 bg-blue-500 rounded-full transition-all duration-700 ease-out"
                        style={{ width: headerVisible ? "100%" : "0%", transitionDelay: "250ms" }}
                    />
                </div>

                <div
                    className={`w-px self-stretch bg-slate-600 transition-all duration-500 ease-out
                        ${headerVisible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"}`}
                    style={{ transitionDelay: "300ms" }}
                />

                <div className="flex-1 flex flex-wrap gap-x-3 text-4xl text-gray-300 font-semibold">
                    {words.map((word, i) => (
                        <span
                            key={i}
                            className={`inline-block transition-all duration-500 ease-out
                                ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                            style={{ transitionDelay: `${380 + i * 100}ms` }}
                        >
                            {word}
                        </span>
                    ))}
                </div>
            </div>

            {/* Body section */}
            <div ref={bodyRef} className="px-48 mt-10 flex flex-col gap-8">

                {/* Paragraph */}
                <div
                    className={`border-l-2 border-blue-500 pl-6 transition-all duration-700 ease-out
                        ${bodyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    style={{ transitionDelay: "0ms" }}
                >
                    <p className="text-slate-300 leading-relaxed text-lg max-w-3xl">
                        MajuSuksesTeknik is the official distributor of NRT Pro and Yamamax Pro,
                        providing customers with genuine products, reliable support, and trusted
                        solutions for professional and industrial applications. We are committed to
                        delivering high-quality equipment and accessories while ensuring competitive
                        pricing, product authenticity, and excellent customer service.
                    </p>
                </div>

                {/* Info columns */}
                <div
                    className={`flex items-stretch gap-6 transition-all duration-700 ease-out
                        ${bodyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    style={{ transitionDelay: "150ms" }}
                >
                    {/* Map */}
                    <div className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 flex flex-col gap-3">
                        <span className="text-white text-lg font-semibold tracking-wide">We are located at</span>
                        <span className="text-blue-400 text-sm">Dadap, Kosambi, Tangerang Regency, Banten 15211</span>
                        <iframe
                            title="MajuSukses Teknik Location"
                            src="https://www.google.com/maps?q=-6.085251,106.703202&output=embed"
                            className="w-full h-72 rounded-xl border-0 pointer-events-none"
                            loading="lazy"
                        />
                        <a
                            href="https://www.google.com/maps?q=-6.085251,106.703202"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 w-full block text-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-xl py-2"
                        >
                            Get Directions
                        </a>
                    </div>

                    <div className="w-px bg-slate-700/60 self-stretch" />

                    {/* Our Videos */}
                    <div ref={videoRef} className="flex-2 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 flex flex-col gap-3">
                        <span className="text-white text-lg font-semibold tracking-wide">Our Videos</span>
                        <span className="text-blue-400 text-sm">Browse all our product videos</span>
                        <iframe
                            title="Product Playlist"
                            src={videoVisible ? `${PLAYLIST_SRC}&autoplay=1&mute=1` : PLAYLIST_SRC}
                            className="w-full h-72 rounded-xl border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                        <div className="flex gap-6">
                            <div className="flex-1">
                                <a className="mt-1 w-full block text-center text-sm font-semibold text-white
                                    bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-xl py-2 px-2"
                                    href="https://www.youtube.com/results?search_query=NRT+PRO"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Browse NRT PRO in Youtube
                                </a>
                            </div>
                            <div className="flex-1">
                                <a className="mt-1 w-full block text-center text-sm font-semibold text-white
                                    bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-xl py-2 px-2"
                                    href="https://www.youtube.com/results?search_query=YAMAMAX+PRO"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Browse Yamamax Pro in Youtube
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trusted By */}
                <div className="flex flex-col items-center gap-6 pt-4">
                    <div className="flex items-center gap-4 w-full">
                        <div className="flex-1 h-px bg-slate-700/60" />
                            <span className="text-xs font-bold tracking-[0.25em] uppercase text-blue-400 shrink-0">
                                Trusted By
                            </span>
                        <div className="flex-1 h-px bg-slate-700/60" />
                    </div>
                    <div className="grid grid-cols-3 gap-4 w-full">
                        <div className="bg-white border border-slate-700/50 rounded-xl px-6 py-4 flex items-center justify-center hover:border-blue-500/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300">
                            <img src={bandara} className="h-24 w-full object-contain rounded-lg" />
                        </div>
                        {/* <div className="w-px h-8 bg-slate-700/60" /> */}
                        <div className="bg-slate-200 border border-slate-700/50 rounded-xl px-6 py-4 flex items-center justify-center hover:border-blue-500/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300">
                            <img src={telkom} className="h-20 w-full object-contain rounded-lg" />
                        </div>
            
                        <div className="rounded-xl px-6 py-4 flex items-center justify-center transition-all duration-300" style={{ backgroundColor: "#2c2f26" }}>
                            <img src={kaspari} className="h-24 w-full object-contain rounded-lg" />
                        </div>

                        <div className="bg-slate-200 border border-slate-700/50 rounded-xl px-6 py-4 flex items-center justify-center hover:border-blue-500/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300">
                            <img src={tokoLOGO} className="h-20 w-full object-contain rounded-lg" />
                        </div>

                        <div className="bg-white border border-slate-700/50 rounded-xl px-6 py-4 flex items-center justify-center hover:border-blue-500/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300">
                            <img src={shopeeLOGO} className="h-20 w-full object-contain rounded-lg" />
                        </div>
                       
                        <div className="bg-slate-200 border border-slate-700/50 rounded-xl px-6 py-4 flex items-center justify-center hover:border-blue-500/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300">
                            <img src={lazadaLOGO} className="h-20 w-full object-contain rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AboutUs;








