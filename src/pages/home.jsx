import { useNavigate } from "react-router-dom";
import footerWave from "../assets/images/footer.png";
import heartPixel from "../assets/images/heart-pixel.png";
import homeVisual from "../assets/images/home-image.png";
import Navbar from "../components/Navbar";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            <section className="bg-white h-screen overflow-hidden px-6 md:px-20 grid md:grid-cols-2 items-center">
                {/* Left: Text Content */}
                <div className="pl-2 md:pl-10  mb-8 translate-y-10 md:translate-y-0">
                    <h1 className="text-5xl md:text-6xl font-black text-black leading-[4rem] tracking-wider mb-8 luckiest">
                        WELCOME TO <br /> PIXIE BOOTH
                    </h1>
                    <p className="text-lg text-[#3f3a4d] mb-8">
                        Your Magical Online Photo Booth!
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                        <img src={heartPixel} alt="heart" className="w-20 h-auto" />
                    </div>
                    <button
                        onClick={() => navigate("/description")}
                        className="mt-4 px-6 py-2 bg-[#FCD0DA] border border-black text-black font-black text-sm tracking-wider hover:scale-105 transition duration-200"
                        style={{ fontFamily: 'Fredoka, sans-serif' }}
                    >
                        START
                    </button>
                </div>


                {/* Right: Collage Visual */}
                <div className="flex justify-center md:justify-end pr-0 md:pr-8">
                    <div className="transform scale-[1.35] translate-y-24 translate-x-6 origin-bottom-right">
                        <img
                            src={homeVisual}
                            alt="PixieBooth visuals"
                            className="w-[460px] md:w-[520px] lg:w-[580px] xl:w-[600px] object-contain"
                        />
                    </div>
                </div>
            </section>

            <footer className="w-full absolute bottom-0 left-0">
                <img
                    src={footerWave}
                    alt="footer design"
                    className="w-full object-cover h-[40px]"
                />
            </footer>



        </>
    );
};

export default Home;
