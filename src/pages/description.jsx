import { useNavigate } from "react-router-dom";
import collage from "../assets/images/description.png";
import footerWave from "../assets/images/footer.png";
import Navbar from "../components/navbar";

// Description page component
// This page introduces users to PixieBooth and guides them to the layout page
const Description = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-10 via-white to-purple-10 font-['Fredoka'] relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-20 left-10 w-24 h-24 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute top-40 right-16 w-16 h-16 bg-purple-200 rounded-full opacity-25 animate-bounce"></div>
                <div className="absolute bottom-40 left-20 w-20 h-20 bg-pink-100 rounded-full opacity-30"></div>

                {/* Main Content */}
                <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-20 text-center z-20 relative">
                    {/* Title All In One Line */}
                    <div className="mb-10 relative">
                        <h1 className="text-5xl md:text-6xl font-black text-black tracking-wider flex items-center justify-center gap-3 luckiest drop-shadow-lg uppercase">
                            Welcome to PixieBooth
                            <span className="text-5xl" style={{ color: "#FC4065" }}>🎀</span>
                        </h1>
                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-56 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>

                    </div>

                    {/* Description Texts */}
                    <div className="space-y-4 max-w-3xl mx-auto mb-10 text-[#3f3a4d] text-lg font-medium">
                        <p>
                            You’ll have <span className="text-pink-600 font-black">3 seconds</span> to pose before each shot — no retakes!
                        </p>
                        <p>
                            This photobooth captures <span className="text-purple-600 font-black">4 pictures in a row</span>, so strike your best pose and have fun!
                        </p>
                        <p>
                            After the session, <span className="text-pink-600 font-black">download your digital copy</span> and share the fun!
                        </p>
                    </div>

                    {/* Continue Button */}
                    <button
                        onClick={() => navigate("/layout")}
                        className="group relative px-8 py-2 bg-gradient-to-r from-pink-400 to-pink-400 text-white font-black text-lg tracking-wider rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border-2 border-white/20 overflow-hidden"
                        style={{ fontFamily: 'Fredoka, sans-serif' }}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            CONTINUE
                            <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </main>

                {/* Collage Illustration */}
                <div className="absolute right-10 bottom-20 md:bottom-24 z-10">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl blur-xl opacity-20 scale-110"></div>
                        <img
                            src={collage}
                            alt="PixieBooth Collage"
                            className="relative h-[360px] md:h-[520px] object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>

                {/* Footer */}
                <footer className="w-full relative z-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200 opacity-30"></div>
                    <img
                        src={footerWave}
                        alt="footer design"
                        className="w-full object-cover h-[40px] relative z-10"
                    />
                </footer>
            </div>
        </>
    );
};

export default Description;
