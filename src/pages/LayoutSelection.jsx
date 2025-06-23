import { useState } from "react";
import { useNavigate } from "react-router-dom";
import footerWave from "../assets/images/footer.png";
import Navbar from "../components/Navbar";

import layoutA from "../assets/layout/Layout A.png";
import layoutB from "../assets/layout/Layout B.png";
import layoutC from "../assets/layout/Layout C.png";
import layoutD from "../assets/layout/Layout D.png";

const LayoutSelection = () => {
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();

    const layouts = [
        { id: "A", image: layoutA },
        { id: "B", image: layoutB },
        { id: "C", image: layoutC },
        { id: "D", image: layoutD },
    ];

    return (
        <>
            <Navbar />
            <div className="flex flex-col min-h-screen items-center bg-white font-['Fredoka'] pt-24 px-6">
                {/* Layout Grid */}
                <div className="flex justify-center gap-10 max-w-6xl w-full">
                    {layouts.map((layout) => (
                        <div
                            key={layout.id}
                            onClick={() => setSelected(layout.id)}
                            className={`cursor-pointer transition duration-200 flex flex-col items-center
                                ${layout.id === "A" ? "mt-4" : ""}
                                ${layout.id === "B" ? "mt-8" : ""}
                                ${layout.id === "C" ? "mt-12" : ""}
                                ${layout.id === "D" ? "mt-16" : ""}
                            `}
                        >
                            <img
                                src={layout.image}
                                alt={`Layout ${layout.id}`}
                                className={`h-auto border-4 ${selected === layout.id ? "border-[#FC98C9]" : "border-transparent"
                                    } ${layout.id === "A" ? "w-[170px]" : "w-[190px]"}`}
                            />
                        </div>
                    ))}
                </div>

                {/* Continue Button */}
                <button
                    onClick={() => navigate("/camera", { state: { layout: selected } })}
                    className="mt-12 px-8 py-2 bg-[#FCD0DA] border border-black rounded-md text-black font-black text-sm tracking-wider hover:scale-105 transition"
                    style={{ fontFamily: 'Fredoka, sans-serif' }}
                >
                    CONTINUE
                </button>
            </div>

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

export default LayoutSelection;
