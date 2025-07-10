import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/api.js";
import loginBg from "../assets/images/login.png";
import logo from "../assets/images/logo.png";
import tvIcon from "../assets/images/Pink-TV.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Signup page component
const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await registerUser({
                name: fullName,
                email,
                password,
            });

            localStorage.setItem("authToken", res.token);
            localStorage.setItem("user", JSON.stringify(res.user));

            toast.success(
                <div className="flex items-center gap-2">
                    <span className="text-lg">🎀</span>
                    <span>Signup Successfully!</span>
                </div>,
                { icon: false }
            );
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            console.error("❌ Signup Error:", err);
            toast.error(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="flex h-screen w-full overflow-hidden font-['Fredoka']">
                {/* Left Section */}
                <div className="w-1/2 hidden md:block h-screen relative">
                    <img
                        src={loginBg}
                        alt="Signup Visual"
                        className="w-full h-full object-contain object-left"
                    />
                    <img
                        src={logo}
                        alt="PixieBooth Logo"
                        className="absolute top-6 left-6 h-32"
                    />
                </div>

                {/* Right Section */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-start -ml-16 px-4 sm:px-10 md:px-20 lg:px-28 pt-4 pb-36 relative bg-white">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-10 left-0 text-gray-600 hover:text-black"
                        aria-label="Go back"
                    >
                        <ArrowLeft size={28} />
                    </button>

                    {/* TV Icon */}
                    <img
                        src={tvIcon}
                        alt="Pixie TV"
                        className="absolute top-6 right-6 h-24 w-24 sm:h-28 sm:w-28 object-contain z-10"
                    />

                    {/* Heading */}
                    <div className="w-full mb-8 mt-4">
                        <h2
                            className="text-2xl sm:text-4xl md:text-4xl text-[#FC98C9] font-black uppercase leading-tight tracking-wider"
                            style={{ fontFamily: "'Luckiest Guy', cursive" }}
                        >
                            Join the Pixie World 🎀
                        </h2>
                    </div>

                    {/* Signup Form */}
                    <form onSubmit={handleSignup} className="w-full max-w-md">
                        {/* Full Name Field */}
                        <div className="flex flex-col mb-6">
                            <label htmlFor="fullName" className="text-sm font-medium mb-1">Full Name</label>
                            <input
                                id="fullName"
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="px-4 py-2 rounded-xl border border-[#FC98C9] shadow-[0_4px_12px_#FFABCC] focus:outline-none focus:ring-2 focus:ring-[#FC98C9] bg-white"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col mb-6">
                            <label htmlFor="email" className="text-sm font-medium mb-1">Email</label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="px-4 py-2 rounded-xl border border-[#FC98C9] shadow-[0_4px_12px_#FFABCC] focus:outline-none focus:ring-2 focus:ring-[#FC98C9] bg-white"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col relative mb-6">
                            <label htmlFor="password" className="text-sm font-medium mb-1">Password</label>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="px-4 py-2 pr-12 rounded-xl border border-[#FC98C9] shadow-[0_4px_12px_#FFABCC] focus:outline-none focus:ring-2 focus:ring-[#FC98C9] bg-white"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-[36px] text-gray-500 hover:text-black"
                                tabIndex={-1}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {/* Signup Button */}
                        <div className="mt-8 mb-4">

                            <button
                                type="submit"
                                className="w-full bg-[#FCD0DA] border border-black py-2 text-lg font-black tracking-widest uppercase rounded-xl shadow-md hover:scale-105 transition duration-300"
                                style={{ fontFamily: "'Fredoka', cursive" }}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Already Have an Account Link */}
                        <p className="text-sm text-center mt-6">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-[#FC98C9] font-semibold hover:underline"
                            >
                                Log In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
