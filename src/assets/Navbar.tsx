function Navbar() {
    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="sticky top-0 z-50 bg-slate-900">
            <div className="px-12 py-4 flex items-center justify-between">
                <a href="#" onClick={scrollToTop} className="text-white font-bold text-2xl">
                    Maju Sukses Teknik
                </a>

                <div className="flex items-center gap-8 text-slate-300 font-medium">
                    <a href="#" onClick={scrollToTop} className="hover:text-blue-400 transition-colors duration-200">
                        Home
                    </a>
                    <a href="#about" className="hover:text-blue-400 transition-colors duration-200">
                        About Us
                    </a>
                    {/* <a href="#certificate" className="hover:text-blue-400 transition-colors duration-200">
                        Certificate
                    </a> */}
                    <a href="#reviews" className="hover:text-blue-400 transition-colors duration-200">
                        Reviews
                    </a>
                </div>
            </div>

            {/* Bottom shadow */}
            <div className="absolute left-0 right-0 top-full h-8 bg-linear-to-b from-slate-900 to-transparent pointer-events-none" />
        </div>
    );
}
export default Navbar;
