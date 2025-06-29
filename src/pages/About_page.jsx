import aboutFlower from "../assets/images/about_flower.png"; // Combined flower + grid
import aboutPhoto from "../assets/images/about_image.png"; // Combined photo + sparkles + frame
import footerWave from "../assets/images/footer.png";
import Navbar from "../components/navbar";

// About page component
const About = () => {
    return (
        <>
            <Navbar />

            <section className="bg-white px-6 md:px-20 pt-28 pb-16 relative overflow-hidden">
                <div className="grid md:grid-cols-2 items-center gap-4">
                    {/* Left: All-in-one Framed photo with sparkles */}
                    <div className="w-full flex justify-start md:justify-center pl-4 md:pl-0">
                        <img
                            src={aboutPhoto}
                            alt="PixieBooth About Photo"
                            className="w-full max-w-[550px]"
                        />
                    </div>

                    {/* Right: Text + decorative flower/grid */}
                    <div className="relative -ml-4 md:-ml-16 max-w-xl">

                        <img
                            src={aboutFlower}
                            alt="Flower Grid"
                            className="absolute -top-20 right-[-250px] w-[430px] hidden md:block"
                        />

                        <p className="text-[#FC98C9] mb-4 font-semibold">About Us</p>
                        <h1 className="text-3xl md:text-4xl font-black tracking-wider leading-snug mb-6" style={{ fontFamily: 'Luckiest Guy, cursive' }}>
                            PIXIE BOOTH –<br />
                            CAPTURE MAGIC IN <br />
                            EVERY SNAP
                        </h1>
                        <p
                            className="text-sm text-[#3f3a4d] mb-6 max-w-md tracking-wider leading-relaxed"
                            style={{ fontFamily: 'Raleway, sans-serif' }}
                        >
                            Pixie Booth is a playful, browser-based photobooth that lets you take instant
                            photos, add colorful frames and cute stickers, and download high-res photo strips —
                            no app or login required. Want to save your photos and access them later? Simply
                            log in to create your personal gallery. Or just snap and go—no sign-up needed for
                            one-time use.
                        </p>
                        <button
                            className="bg-[#FCD0DA] border border-black px-6 py-2 font-bold tracking-wider hover:scale-105 transition"
                            style={{ fontFamily: 'Fredoka, sans-serif' }}
                        >
                            DISCOVER MORE
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
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

export default About;
