import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import loginBg from "../assets/images/login.png";
import logo from "../assets/images/logo.png";
import tvIcon from "../assets/images/Pink-TV.png";

import { ToastContainer, toast } from "react-toastify"; // Importing toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Importing toast styles

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const userData = { email, password };
            const response = await loginUser(userData);

            localStorage.setItem("authToken", response.token);
            localStorage.setItem("pixiebooth_user", JSON.stringify(response.user));

            toast.success(
                <div className="flex items-center gap-2">
                    <span className="text-lg">🎀</span>
                    <span>Welcome back to PixieBooth!</span>
                </div>,
                { icon: false }
            );

            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            console.error("Login failed:", error);
            toast.error(error.response?.data?.message || "Invalid email or password");
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                pauseOnFocusLoss
                theme="light"
                toastClassName={() =>
                    "bg-[#FCD0DA] text-[#4B2C3C] font-['Fredoka'] text-sm sm:text-base pt-3 pb-3 px-4 rounded-xl border border-[#FC98C9] shadow-[0_4px_12px_#FFABCC] relative overflow-hidden w-[260px] sm:w-[300px]"
                }
                bodyClassName={() => "text-sm font-medium px-2 pt-1"}
                progressClassName="!bg-[#FC98C9] !h-1 !absolute !top-0 !inset-x-0 rounded-t-xl"
            />

            <div className="flex h-screen w-full overflow-hidden font-['Fredoka']">
                {/* Left Section */}
                <div className="w-1/2 hidden md:block h-screen relative">
                    <img
                        src={loginBg}
                        alt="Login Visual"
                        className="w-full h-full object-contain object-left"
                    />
                    <Link to="/" className="absolute top-6 left-6 h-32">
                        <img
                            src={logo}
                            alt="PixieBooth Logo"
                            className="h-full w-auto object-contain"
                        />
                    </Link>
                </div>

                {/* Right Section */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-start -ml-16 px-4 sm:px-10 md:px-20 lg:px-28 pt-4 pb-36 relative bg-white">

                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/")}
                        className="absolute top-10 left-0 text-gray-600 hover:text-black"
                        aria-label="Go home"
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
                    <h2
                        className="text-2xl sm:text-4xl md:text-4xl text-[#FC98C9] font-black mb-8 mt-4 uppercase leading-tight tracking-wider -ml-6"
                        style={{ fontFamily: "'Luckiest Guy', cursive" }}
                    >
                        Save what makes you smile
                    </h2>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
                        {/* Email Field */}
                        <div className="flex flex-col">
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
                        <div className="flex flex-col relative">
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

                        {/* Login Button */}
                        <div className="mt-8 mb-4">
                            <button
                                type="submit"
                                className="w-full bg-[#FCD0DA] border border-black py-2 text-lg font-black tracking-widest rounded-xl shadow-md hover:scale-105 transition duration-300"
                                style={{ fontFamily: "'Fredoka', cursive" }}
                            >
                                LOGIN
                            </button>
                        </div>

                        {/* Sign Up Link */}
                        <p className="text-sm text-center mt-2">
                            Don&apos;t have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-[#FC98C9] font-semibold hover:underline"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
