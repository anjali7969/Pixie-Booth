import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Navbar = () => {
    return (
        <nav className="bg-white fixed w-full z-50 top-0 border-gray-200">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex items-center">
                    <Link to="/">
                        <img src={logo} alt="PixieBooth Logo" className="h-28 w-auto" />
                    </Link>
                </div>

                {/* Center: Nav Links */}
                <div className="hidden md:flex flex-1 justify-center space-x-12">
                    <Link
                        to="/"
                        className="text-[#FC98C9] font-['Abril_Fatface'] text-base tracking-wide hover:text-black transition"
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="text-[#FC98C9] font-['Abril_Fatface'] text-base tracking-wide hover:text-black transition"
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className="text-[#FC98C9] font-['Abril_Fatface'] text-base tracking-wide hover:text-black transition"
                    >
                        Contact
                    </Link>
                </div>

                {/* Right: Auth Buttons */}
                <div className="flex items-center space-x-3">
                    <Link to="/login">
                        <button
                            className="px-5 py-2 text-sm font-bold tracking-wider border border-black bg-[#FCD0DA] hover:scale-105 transition"
                            style={{ fontFamily: 'Fredoka, sans-serif' }}
                        >
                            LOGIN
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button
                            className="px-5 py-2 text-sm font-bold tracking-wider border border-black bg-[#FCD0DA] hover:scale-105 transition"
                            style={{ fontFamily: 'Fredoka, sans-serif' }}
                        >
                            SIGN UP
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
