import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/images/default-avatar.png";
import logo from "../assets/images/logo.png";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [profileImage, setProfileImage] = useState(defaultAvatar);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("pixiebooth_user"));

        if (storedUser) {
            setUser(storedUser);

            const image = storedUser.profileImage;

            const imageURL = image?.startsWith("/public/")
                ? `http://localhost:5000${image}`
                : image?.startsWith("http")
                    ? image
                    : defaultAvatar;


            setProfileImage(imageURL);
        } else {
            setUser(null);
            setProfileImage(defaultAvatar);
        }
    }, [location]);

    return (
        <nav className="bg-white fixed w-full z-50 top-0 border-gray-200">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <Link to="/">
                        <img src={logo} alt="PixieBooth Logo" className="h-28 w-auto" />
                    </Link>
                </div>

                {/* Center nav links */}
                <div className="hidden md:flex flex-1 justify-center space-x-12">
                    <Link to="/" className="text-[#FC98C9] font-['Abril_Fatface'] hover:text-black">
                        Home
                    </Link>
                    <Link to="/about" className="text-[#FC98C9] font-['Abril_Fatface'] hover:text-black">
                        About
                    </Link>
                    <Link to="/contact" className="text-[#FC98C9] font-['Abril_Fatface'] hover:text-black">
                        Contact
                    </Link>
                </div>

                {/* Right: Auth or Profile */}
                <div className="flex items-center space-x-3">
                    {user ? (
                        <div
                            onClick={() => navigate("/profile")}
                            className="flex items-center gap-2 border border-pink-400 px-4 py-2 rounded-full shadow bg-white cursor-pointer hover:bg-pink-50 transition"
                        >
                            <img
                                src={profileImage}
                                alt="profile"
                                className="w-6 h-6 rounded-full object-cover"
                            />
                            <p className="text-sm font-semibold text-black">{user.name}</p>
                        </div>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
