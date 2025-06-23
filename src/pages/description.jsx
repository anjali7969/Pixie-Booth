import { useNavigate } from "react-router-dom";
import collage from "../assets/images/description.png";
import footerWave from "../assets/images/footer.png";
import Navbar from "../components/Navbar";

const Description = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            <div className="flex flex-col min-h-screen bg-white font-['Fredoka']">
                {/* Main Content Centered */}
                <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-20 text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-black mb-4 uppercase tracking-wider luckiest">
                        <strong>Welcome to PixieBooth 🎀</strong>
                    </h1>

                    <div className="space-y-4 leading-relaxed max-w-2xl text-center mx-auto text-[#3f3a4d] text-base md:text-lg">
                        <p>
                            You’ll have <strong>3 seconds</strong> to pose before each shot — no retakes!
                        </p>
                        <p>
                            This photobooth captures <strong>4 pictures in a row</strong>, so strike your best pose and have fun!
                        </p>
                        <p>
                            After the session, download your digital copy and share the fun!
                        </p>
                    </div>

                    {/* Start Button */}
                    <button
                        onClick={() => navigate("/layout")}
                        className="mt-6 px-6 py-2 bg-[#FCD0DA] border border-black text-black font-black text-sm tracking-wider hover:scale-105 transition duration-200"
                        style={{ fontFamily: 'Fredoka, sans-serif' }}
                    >
                        START
                    </button>
                </main>

                {/* Collage on bottom right like image */}
                <div className="absolute right-10 bottom-20 md:bottom-24 z-10">
                    <img
                        src={collage}
                        alt="PixieBooth Collage"
                        className="h-[360px] md:h-[520px] object-contain"
                    />
                </div>

                {/* Footer */}
                <footer className="w-full">
                    <img
                        src={footerWave}
                        alt="footer design"
                        className="w-full object-cover h-[40px]"
                    />
                </footer>
            </div>
        </>
    );
};

export default Description;
