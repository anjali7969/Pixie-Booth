import { useState } from "react";
import { useNavigate } from "react-router-dom";
import footerWave from "../assets/images/footer.png";
import Navbar from "../components/navbar";

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
            <div className="flex flex-col h-screen items-center bg-gradient-to-br from-pink-10 via-pink-10 to-pink-10 font-['Fredoka'] pt-16 px-6 relative overflow-hidden">
                {/* Floating Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-32 left-20 w-4 h-4 bg-pink-300/30 rounded-full animate-bounce"></div>
                    <div className="absolute top-48 right-32 w-3 h-3 bg-purple-300/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute top-64 left-1/4 w-2 h-2 bg-blue-300/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-64 right-20 w-5 h-5 bg-yellow-300/30 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
                    <div className="absolute top-80 right-1/3 w-3 h-3 bg-green-300/30 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
                </div>

                {/* Title Section */}
                <div className="text-center mt-4 mb-4">
                    <h1 className="text-3xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-400 to-blue-400 mb-2">
                        Choose Your Layout ✨
                    </h1>
                    <p className="text-[#3f3a4d] text-s">Pick your favorite photo strip design</p>
                </div>

                {/* Layout Grid */}
                <div className="flex justify-center gap-10 max-w-4xl w-full relative z-10">
                    {layouts.map((layout) => (
                        <div
                            key={layout.id}
                            onClick={() => setSelected(layout.id)}
                            className={`cursor-pointer transition-all duration-300 flex flex-col items-center 
                                ${layout.id === "A" ? "mt-4" : ""}
                                ${layout.id === "B" ? "mt-8" : ""}
                                ${layout.id === "C" ? "mt-12" : ""}
                                ${layout.id === "D" ? "mt-16" : ""}
                            `}
                        >
                            <div className="relative min-h-[270px]">
                                <div className={`absolute -inset-4 rounded-2xl blur-lg transition-opacity duration-300
                                    ${selected === layout.id
                                        ? "bg-gradient-to-r from-pink-300 to-purple-300 opacity-50 animate-pulse"
                                        : "opacity-0"
                                    }`}>
                                </div>

                                <div className={`relative bg-white rounded-2xl p-3 border-2 transition-all duration-300 shadow-lg hover:shadow-xl
                                    ${selected === layout.id
                                        ? "border-[#FC98C9] bg-white shadow-pink-200/50"
                                        : "border-white/30 hover:border-pink-200/50"
                                    }`}>
                                    <img
                                        src={layout.image}
                                        alt={`Layout ${layout.id}`}
                                        className={`h-auto transition-all duration-300
                                            ${layout.id === "A" ? "w-[170px]" : "w-[190px]"}`}
                                    />
                                </div>

                                <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs transition-opacity duration-300
                                    ${selected === layout.id
                                        ? "bg-gradient-to-r from-pink-400 to-purple-400 opacity-100 animate-bounce"
                                        : "opacity-0"
                                    }`}>
                                    ✓
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {!selected && (
                    <div className="-mt-5 text-center">
                        <p className="text-[#3f3a4d] text-sm animate-pulse">👆 Tap on a layout to select it</p>
                    </div>
                )}

                {/* Continue Button */}
                <button
                    onClick={() => navigate("/camera", { state: { layout: selected } })}
                    disabled={!selected}
                    className={`mt-2 px-8 py-2 bg-[#FCD0DA] border border-black rounded-md text-black font-black text-sm tracking-wider hover:scale-105 transition
                        ${!selected ? "opacity-50 cursor-not-allowed" : "hover:scale-105 cursor-pointer"}`}
                    style={{ fontFamily: 'Fredoka, sans-serif' }}
                >
                    {selected ? `CONTINUE WITH LAYOUT ${selected} ✨` : "SELECT A LAYOUT FIRST"}
                </button>
            </div>

            <footer className="w-full absolute bottom-0 left-0">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 opacity-40"></div>
                <img
                    src={footerWave}
                    alt="footer design"
                    className="w-full object-cover h-[40px] relative z-10"
                />
            </footer>
        </>
    );
};

export default LayoutSelection;
