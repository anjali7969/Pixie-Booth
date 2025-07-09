import { useNavigate } from "react-router-dom";
import footerWave from "../assets/images/footer.png";
import heartPixel from "../assets/images/heart-pixel.png";
import homeVisual from "../assets/images/home-image.png";
import Navbar from "../components/navbar";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            {/* Enhanced Background with Gradient and Effects */}
            <section className="relative bg-gradient-to-br from-white via-pink-10 to-purple-10 h-screen overflow-hidden px-6 md:px-20 grid md:grid-cols-2 items-center">
                {/* Floating Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-10 w-8 h-8 bg-yellow-200 rounded-full opacity-60 animate-float"></div>
                    <div className="absolute top-40 right-20 w-6 h-6 bg-pink-200 rounded-full opacity-50 animate-float" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-40 left-20 w-4 h-4 bg-purple-200 rounded-full opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-60 left-1/3 w-3 h-3 bg-blue-200 rounded-full opacity-60 animate-float" style={{ animationDelay: '0.5s' }}></div>
                </div>

                {/* Left: Text Content - Enhanced with visual effects */}
                <div className="relative pl-2 md:pl-10 mb-8 translate-y-10 md:translate-y-0 z-10">
                    {/* Enhanced Title with Glow Effect */}
                    <h1 className="text-5xl md:text-6xl font-black text-black leading-[4rem] tracking-wider mb-8 luckiest relative">
                        <span className="relative inline-block">
                            WELCOME TO
                            <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 to-black-300 rounded-lg blur opacity-20 animate-pulse"></div>
                        </span>
                        <br />
                        <span className="relative inline-block bg-gradient-to-r from-pink-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
                            PIXIE BOOTH
                            <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 to-black-400 rounded-lg blur-sm opacity-30 animate-pulse"></div>
                        </span>
                    </h1>

                    {/* Enhanced Floating Bow - keeping your original positioning */}
                    <div className="absolute -top-10 -left-5 text-yellow-400 text-4xl animate-bounce select-none z-0">
                        <span className="drop-shadow-lg filter">🎀</span>
                    </div>

                    {/* Enhanced Subtitle */}
                    <p className="text-lg text-[#3f3a4d] mb-8 relative">
                        <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent font-semibold">
                            Your Magical Online Photo Booth!
                        </span>
                        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-50"></div>
                    </p>

                    {/* Enhanced Heart with Glow - keeping your original heart image */}
                    <div className="flex items-center gap-2 mb-4 relative">
                        <div className="relative">
                            <img src={heartPixel} alt="heart" className="w-20 h-auto animate-pulse relative z-10" />
                            <div className="absolute inset-0 w-20 h-20 bg-pink-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                        </div>

                    </div>

                    {/* Enhanced Button - keeping your original button exactly */}
                    <button
                        onClick={() => navigate("/description")}
                        className="group relative mt-4 px-8 py-3 bg-gradient-to-r from-[#FCD0DA] to-[#F8BBD9] border-2 border-black text-black font-black text-sm tracking-wider hover:scale-110 transition-all duration-300 ease-in-out rounded-full shadow-lg hover:shadow-pink-300 overflow-hidden"
                        style={{ fontFamily: 'Fredoka, sans-serif' }}
                    >
                        {/* Button Background Animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-purple-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                        {/* Button Content - keeping your original text */}
                        <span className="relative z-10 flex items-center gap-2">
                            LET'S GET STARTED
                            <span className="inline-block ">✨</span>
                        </span>

                        {/* Button Shimmer Effect */}
                        <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-12 transition-transform duration-700"></div>
                    </button>
                </div>

                {/* Right: Collage Visual - Enhanced with glow effects */}
                <div className="flex justify-center md:justify-end pr-0 md:pr-8 relative">
                    {/* Glow Effect Behind Image */}
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div> */}

                    {/* Enhanced Image Container - keeping your original transform and positioning */}
                    <div className="relative transform scale-[1.35] translate-y-24 translate-x-6 origin-bottom-right">
                        <div className="relative">
                            <img
                                src={homeVisual}
                                alt="PixieBooth visuals"
                                className="w-[460px] md:w-[520px] lg:w-[580px] xl:w-[600px] object-contain relative z-10 drop-shadow-2xl"
                            />
                            {/* Image Glow Effect */}
                            {/* <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-purple-300 rounded-3xl blur-2xl opacity-30 animate-pulse"></div> */}
                        </div>

                        {/* Floating Elements Around Image */}
                        <div className="absolute top-6 -left-20 text-2xl animate-float">💖</div>
                        {/* <div className="absolute top-5 -right-5 text-2xl animate-float" style={{ animationDelay: '1s' }}>🌟</div> */}
                        <div className="absolute bottom-5 -left-40 text-2xl animate-float" style={{ animationDelay: '2s' }}>🌟</div>
                        <div className="absolute top-1/2 -right-10 text-xl animate-float" style={{ animationDelay: '1.5s' }}>🎨</div>
                    </div>
                </div>
            </section>

            {/* Enhanced Footer - keeping your original footer */}
            <footer className="w-full absolute bottom-0 left-0 z-20">
                <div className="relative">
                    <img
                        src={footerWave}
                        alt="footer design"
                        className="w-full object-cover h-[40px] relative z-10"
                    />
                    {/* Footer Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 blur-sm opacity-30"></div>
                </div>
            </footer>

            {/* Enhanced Custom Animations - keeping your original float animation and adding more */}
            <style>
                {`
                    @keyframes float {
                        0% { transform: translateY(0px) rotate(0deg); }
                        33% { transform: translateY(-10px) rotate(2deg); }
                        66% { transform: translateY(-5px) rotate(-1deg); }
                        100% { transform: translateY(0px) rotate(0deg); }
                    }
                    .animate-float {
                        animation: float 4s ease-in-out infinite;
                    }
                    
                    @keyframes shimmer {
                        0% { transform: translateX(-100%) skewX(-15deg); }
                        100% { transform: translateX(200%) skewX(-15deg); }
                    }
                    
                    @keyframes glow {
                        0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.3); }
                        50% { box-shadow: 0 0 30px rgba(236, 72, 153, 0.5), 0 0 40px rgba(147, 51, 234, 0.3); }
                    }
                    
                    @keyframes sparkle {
                        0%, 100% { opacity: 0.3; transform: scale(0.8); }
                        50% { opacity: 1; transform: scale(1.2); }
                    }
                    
                    /* Additional fancy effects */
                    .animate-glow {
                        animation: glow 2s ease-in-out infinite alternate;
                    }
                    
                    .animate-sparkle {
                        animation: sparkle 1.5s ease-in-out infinite;
                    }
                `}
            </style>
        </>
    );
};

export default Home;