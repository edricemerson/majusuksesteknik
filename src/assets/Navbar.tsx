function Navbar() {
    return (
        <div className="sticky top-0 z-50 bg-slate-900">
            <div className="px-12 py-4 flex items-center justify-between">
                <div className="text-white font-bold text-2xl">
                    Maju Sukses Teknik
                </div>

                <div className="flex items-center gap-8 text-slate-300 font-medium">
                    <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                        Home
                    </a>

                    <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                        About Us
                    </a>

                    <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                        Certificate
                    </a>

                    <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                        Reviews
                    </a>
                </div>
            </div>
        </div>
    );
}
export default Navbar;