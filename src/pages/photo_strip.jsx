import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import footerWave from "../assets/images/footer.png";
import rightSticker from "../assets/images/layout_side.png";
import leftSticker from "../assets/images/left_star.png";

// ✅ import your girlypop sticker
import girlypopSticker from "../assets/stickers/1sticker.png";

import Navbar from "../components/navbar";

const frameColors = [
    "White", "Black", "Blue", "Green", "Pink", "Yellow",
    "Purple", "Maroon", "Brown", "Burgundy"
];

const frameColorHexMap = {
    White: "#FFFFFF",
    Black: "#000000",
    Blue: "#2571C2",
    Green: "#85A865",
    Pink: "#FC98C9",
    Yellow: "#FFF48C",
    Purple: "#CBA0FF",
    Maroon: "#B23A48",
    Brown: "#6B4C47",
    Burgundy: "#80003C"
};

const stickers = [
    "No Sticker", "Girlypop", "Cute", "Jellycat",
    "Shin chan", "Miffy", "Valentine's"
];

const PhotoStrip = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { layout, photos = [] } = location.state || {};
    const layoutText = `Layout ${layout} (${photos.length} Photos)`;

    const [selectedFrameColor, setSelectedFrameColor] = useState("White");
    const [selectedSticker, setSelectedSticker] = useState("No Sticker");

    useEffect(() => {
        if (!layout || photos.length === 0) {
            console.warn("Missing layout or photos.");
        }
    }, [layout, photos]);

    /** === Strip content === */
    const renderLayoutStrip = () => {
        switch (String(layout)) {
            case "A":
            case "B":
            case "C":
                return (
                    <div className="flex flex-col gap-4">
                        {photos.map((photo, idx) => (
                            <div
                                key={idx}
                                className="w-[170px] h-[110px] overflow-hidden mx-auto"
                            >
                                <img src={photo} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                );
            case "D":
                return (
                    <div className="grid grid-cols-2 grid-rows-3 gap-4">
                        {photos.map((photo, idx) => (
                            <div
                                key={idx}
                                className="w-[130px] h-[110px] overflow-hidden"
                            >
                                <img src={photo} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                );
            default:
                return (
                    <p className="text-sm text-red-500">Unknown layout</p>
                );
        }
    };

    // ✅ Timestamp text color
    const timestampTextColor = ["White", "Yellow", "Purple"].includes(selectedFrameColor)
        ? "text-black" : "text-white";

    /** === Stickers per layout === */
    const renderStickerPerLayout = () => {
        if (selectedSticker !== "Girlypop") return null;

        switch (String(layout)) {
            case "A":
                return (
                    <img
                        src={girlypopSticker}
                        alt="Girlypop Sticker"
                        className="absolute pointer-events-none select-none"
                        style={{
                            top: "-10px",
                            left: "0",
                            width: "100%",
                            height: "105%",
                            objectFit: "cover"
                        }}
                    />
                );
            case "B":
                return (
                    <img
                        src={girlypopSticker}
                        alt="Girlypop Sticker"
                        className="absolute pointer-events-none select-none"
                        style={{
                            top: "-70px",
                            left: "0",
                            width: "100%",
                            height: "105%",
                            objectFit: "cover"
                        }}
                    />
                );
            case "C":
                return (
                    <img
                        src={girlypopSticker}
                        alt="Girlypop Sticker"
                        className="absolute pointer-events-none select-none"
                        style={{
                            top: "10px",
                            left: "0",
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }}
                    />
                );
            case "D":
                return (
                    <img
                        src={girlypopSticker}
                        alt="Girlypop Sticker"
                        className="absolute pointer-events-none select-none"
                        style={{
                            top: "-20px",
                            left: "0",
                            width: "100%",
                            height: "115%",
                            objectFit: "cover"
                        }}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Navbar />
            <div className="relative min-h-screen bg-white pt-20 px-6 font-['Fredoka'] overflow-x-hidden">

                {/* Decorative Stickers */}
                <img
                    src={leftSticker}
                    alt="left decor"
                    className="absolute left-15 top-[38%] -translate-y-1/2 w-[130px] pointer-events-none select-none"
                />
                <img
                    src={rightSticker}
                    alt="right decor"
                    className="absolute left-[24rem] top-[35%] -translate-y-1/2 w-[250px] pointer-events-none select-none"
                />

                <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
                    {/* Layout Label */}
                    <p className="text-xs border px-4 py-1 border-black mb-2 bg-[#f0dce7]">
                        {layoutText}
                    </p>

                    <h2 className="text-lg font-semibold mt-4 mb-6 ml-40 tracking-wide font-['Fredoka']">
                        Customize your photo strip
                    </h2>

                    {/* LEFT + RIGHT */}
                    <div className="flex flex-col md:flex-row w-full justify-start">

                        {/* LEFT: Photo Strip */}
                        <div className="flex justify-center md:justify-start w-full md:w-auto relative">
                            <div
                                className={`
                  shadow-lg px-4 pt-4 pb-2 overflow-hidden
                  ${String(layout) === "D"
                                        ? "w-auto -ml-6 -mt-14"
                                        : String(layout) === "C"
                                            ? "w-[210px] mt-2"
                                            : "w-[210px] -mt-14"}
                  self-start border-2 relative
                `}
                                style={{
                                    backgroundColor: frameColorHexMap[selectedFrameColor],
                                    borderColor: frameColorHexMap[selectedFrameColor]
                                }}
                            >
                                {renderLayoutStrip()}
                                <p className={`text-[9px] text-center mt-2 italic ${timestampTextColor}`}>
                                    PixieBooth &nbsp; {new Date().toLocaleDateString()} &nbsp;
                                    {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </p>

                                {/* ✅ Sticker */}
                                {renderStickerPerLayout()}
                            </div>
                        </div>

                        {/* RIGHT: Controls */}
                        <div className="flex flex-col w-full max-w-lg mt-8 md:mt-0 md:ml-60">
                            <div className="flex flex-col gap-8">
                                {/* Frame Color */}
                                <div className="w-full">
                                    <h3 className="text-sm font-semibold mb-4 ml-20">Frame Color</h3>
                                    <div className="flex flex-wrap gap-5">
                                        {frameColors.map(color => {
                                            const textColor = ["White", "Yellow", "Purple"].includes(color) ? "text-black" : "text-black";
                                            return (
                                                <button
                                                    key={color}
                                                    onClick={() => setSelectedFrameColor(color)}
                                                    className={`px-4 py-1 border border-black rounded-full bg-white hover:bg-pink-100 transition text-xs ${textColor}`}
                                                >
                                                    {color}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Stickers */}
                                <div className="w-full">
                                    <h3 className="text-sm font-semibold mb-4 ml-20">Stickers</h3>
                                    <div className="flex flex-wrap gap-5">
                                        {stickers.map(sticker => (
                                            <button
                                                key={sticker}
                                                onClick={() => setSelectedSticker(sticker)}
                                                className="px-4 py-1 border border-black rounded-full bg-white hover:bg-pink-100 transition text-xs"
                                            >
                                                {sticker}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-4">
                                    <button className="px-4 py-3 text-xs border border-black rounded-full bg-white hover:bg-pink-50 transition">
                                        📄 Download Photo Strip
                                    </button>
                                    <button className="px-4 py-3 text-xs border border-black rounded-full bg-white hover:bg-pink-50 transition">
                                        📲 Download via QR Code
                                    </button>
                                    <button className="px-4 py-3 text-xs border border-black rounded-full bg-white hover:bg-pink-50 transition">
                                        🎞 Download GIF
                                    </button>
                                    <button
                                        onClick={() => navigate("/camera")}
                                        className="px-4 py-3 text-xs border border-black rounded-full bg-[#FCD0DA] font-semibold hover:bg-pink-100 transition"
                                    >
                                        📷 Take New Photos
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <footer className="w-full absolute bottom-0 left-0">
                    <img
                        src={footerWave}
                        alt="footer"
                        className="w-full object-cover h-[30px]"
                    />
                </footer>
            </div>
        </>
    );
};

export default PhotoStrip;
