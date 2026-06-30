import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        setMenuOpen(false);
    };

    const navLink = "relative text-slate-300 font-medium hover:text-blue-400 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full pb-1";

    return (
        <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
            <div className="px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between">

                {/* Brand */}
                <a href="#" onClick={scrollToTop} className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-900/50 group-hover:bg-blue-500 transition-colors duration-200">
                        <span className="text-white font-black text-sm leading-none">M</span>
                    </div>
                    <span className="text-white font-bold text-lg sm:text-xl tracking-tight">
                        Maju <span className="text-blue-400">Sukses</span> Teknik
                    </span>
                </a>

                {/* Nav links (desktop) */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#" onClick={scrollToTop} className={navLink}>Home</a>
                    <a href="#about" className={navLink}>About Us</a>
                    <a href="#reviews" className={navLink}>Reviews</a>
                </div>

                {/* Menu toggle (mobile) */}
                <button
                    className="md:hidden text-slate-300 hover:text-blue-400 transition-colors duration-200"
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Nav links (mobile dropdown) */}
            {menuOpen && (
                <div className="md:hidden flex flex-col gap-1 px-4 pb-4">
                    <a href="#" onClick={scrollToTop} className="text-slate-300 font-medium hover:text-blue-400 transition-colors duration-200 py-2">Home</a>
                    <a href="#about" onClick={() => setMenuOpen(false)} className="text-slate-300 font-medium hover:text-blue-400 transition-colors duration-200 py-2">About Us</a>
                    <a href="#reviews" onClick={() => setMenuOpen(false)} className="text-slate-300 font-medium hover:text-blue-400 transition-colors duration-200 py-2">Reviews</a>
                </div>
            )}

            {/* Bottom fade shadow */}
            <div className="absolute left-0 right-0 top-full h-8 bg-linear-to-b from-slate-900 to-transparent pointer-events-none" />
        </div>
    );
}
export default Navbar;
