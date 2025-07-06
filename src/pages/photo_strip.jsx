import { saveAs } from "file-saver";
import gifshot from "gifshot";
import html2canvas from "html2canvas";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import footerWave from "../assets/images/footer.png";
import rightSticker from "../assets/images/layout_side.png";
import leftSticker from "../assets/images/left_star.png";

import girlypopSticker from "../assets/stickers/1sticker.png";
import girlypop from "../assets/stickers/2sticker.png";
import cuteSticker from "../assets/stickers/Cute.png";
import birthdaySticker from "../assets/stickers/happy_birthday.png";
import jellycatSticker from "../assets/stickers/Jellycat.png";
import shinchanSticker from "../assets/stickers/Shinchan.png";
import valentineSticker from "../assets/stickers/valentine.png";


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
    "Shin chan", "Birthday", "Valentine's"
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

    const renderLayoutStrip = () => {
        const photoBoxClass = "w-[160px] h-[110px] mx-auto overflow-hidden flex items-center justify-center";

        switch (String(layout)) {
            case "A":
            case "B":
            case "C":
                return (
                    <div className="flex flex-col gap-4">
                        {photos.map((photo, idx) => (
                            <div
                                key={idx}
                                style={{
                                    width: '147px',
                                    height: '110px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    overflow: 'hidden',

                                    margin: '0 auto',
                                    backgroundColor: '#fff',
                                }}
                            >
                                <img
                                    src={photo}
                                    alt={`Photo ${idx + 1}`}
                                    style={{
                                        width: 'auto',
                                        height: '100%',
                                        objectFit: 'contain',
                                    }}
                                />
                            </div>


                        ))}
                    </div>
                );

            case "D":
                return (
                    <div className="grid grid-cols-2 grid-rows-3 gap-4">
                        {photos.map((photo, idx) => (
                            <div key={idx} className="w-[140px] h-[110px] overflow-hidden flex items-center justify-center">
                                <img
                                    src={photo}
                                    alt={`Photo ${idx + 1}`}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        ))}
                    </div>
                );

            default:
                return <p className="text-sm text-red-500">Unknown layout</p>;
        }
    };

    const saveStripToGallery = async (imageDataUrl) => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            console.warn("🚫 No auth token found");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/gallery/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // ✅ format must be correct
                },
                body: JSON.stringify({ imageUrl: imageDataUrl }),
            });

            if (!res.ok) {
                const errText = await res.text();
                console.error("❌ Server error:", errText);
            } else {
                console.log("✅ Strip image saved to gallery");
            }
        } catch (error) {
            console.error("❌ Failed to save strip image:", error);
        }
    };





    const timestampTextColor = ["White", "Yellow", "Purple"].includes(selectedFrameColor)
        ? "text-black" : "text-white";

    const renderStickerPerLayout = () => {
        // Girlypop sticker logic
        if (selectedSticker === "Girlypop") {
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
                                height: "110%",
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
                                top: "0px",
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
                            src={girlypop}
                            alt="Girlypop Sticker"
                            className="absolute pointer-events-none select-none"
                            style={{
                                top: "-5px",
                                left: "0px",
                                width: "110%",
                                height: "110%",
                                objectFit: "cover"
                            }}
                        />
                    );
                default:
                    return null;
            }
        }

        // Cute sticker logic
        if (selectedSticker === "Cute") {
            switch (String(layout)) {
                case "A":
                    return (
                        <img
                            src={cuteSticker}
                            alt="Cute Sticker"
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
                            src={cuteSticker}
                            alt="Cute Sticker"
                            className="absolute pointer-events-none select-none"
                            style={{
                                top: "-60px",
                                left: "0",
                                width: "100%",
                                height: "107%",
                                objectFit: "cover"
                            }}
                        />
                    );
                case "C":
                    return (
                        <img
                            src={cuteSticker}
                            alt="Cute Sticker"
                            className="absolute pointer-events-none select-none"
                            style={{
                                top: "0px",
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
                            src={cuteSticker}
                            alt="Cute Sticker"
                            className="absolute pointer-events-none select-none"
                            style={{
                                top: "-5px",
                                left: "0px",
                                width: "110%",
                                height: "110%",
                                objectFit: "cover"
                            }}
                        />
                    );
                default:
                    return null;
            }
        }

        // Jellycat sticker logic
        if (selectedSticker === "Jellycat") {
            switch (String(layout)) {
                case "A":
                    return (
                        <img
                            src={jellycatSticker}
                            alt="Jellycat Sticker"
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
                            src={jellycatSticker}
                            alt="Jellycat Sticker"
                            className="absolute pointer-events-none select-none"
                            style={{
                                top: "-70px",
                                left: "0",
                                width: "100%",
                                height: "117%",
                                objectFit: "cover"
                            }}
                        />
                    );
                case "C":
                    return (
                        <img
                            src={jellycatSticker}
                            alt="Jellycat Sticker"
                            className="absolute pointer-events-none select-none"
                            style={{
                                top: "0px",
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
                            src={jellycatSticker}
                            alt="Jellycat Sticker"
                            className="absolute pointer-events-none select-none"
                            style={{
                                top: "-5px",
                                left: "0px",
                                width: "110%",
                                height: "110%",
                                objectFit: "cover"
                            }}
                        />
                    );
                default:
                    return null;
            }
        }

        // Shin chan sticker logic
        if (selectedSticker === "Shin chan") {
            switch (String(layout)) {
                case "A":
                    return (
                        <img
                            src={shinchanSticker}
                            alt="Shin chan Sticker"
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
                            src={shinchanSticker}
                            alt="Shin chan Sticker"
                            className="absolute pointer-events-none select-none"
                            style={{
                                top: "-70px",
                                left: "0",
                                width: "100%",
                                height: "117%",
                                objectFit: "cover"
                            }}
                        />
                    );
                case "C":
                    return (
                        <img
                            src={shinchanSticker}
                            alt="Shin chan Sticker"
                            className="absolute pointer-events-none select-none"
                            style={{
                                top: "0px",
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
                            src={shinchanSticker}
                            alt="Shin chan Sticker"
                            className="absolute pointer-events-none select-none"
                            style={{
                                top: "-5px",
                                left: "0px",
                                width: "110%",
                                height: "110%",
                                objectFit: "cover"
                            }}
                        />
                    );
                default:
                    return null;
            }
        }

        // Birthday sticker logic
        if (selectedSticker === "Birthday") {
            switch (String(layout)) {
                case "A":
                    return (
                        <img
                            src={birthdaySticker}
                            alt="Birthday Sticker"
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
                            src={birthdaySticker}
                            alt="Birthday Sticker"
                            className="absolute pointer-events-none select-none"
                            style={{
                                top: "-70px",
                                left: "0",
                                width: "100%",
                                height: "117%",
                                objectFit: "cover"
                            }}
                        />
                    );
                case "C":
                    return (
                        <img
                            src={birthdaySticker}
                            alt="Birthday Sticker"
                            className="absolute pointer-events-none select-none"
                            style={{
                                top: "0px",
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
                            src={birthdaySticker}
                            alt="Birthday Sticker"
                            className="absolute pointer-events-none select-none"
                            style={{
                                top: "-5px",
                                left: "0px",
                                width: "110%",
                                height: "110%",
                                objectFit: "cover"
                            }}
                        />
                    );
                default:
                    return null;
            }
        }

        // Valentine's sticker logic
        if (selectedSticker === "Valentine's") {
            switch (String(layout)) {
                case "A":
                    return (
                        <img
                            src={valentineSticker}
                            alt="Valentine's Sticker"
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
                            src={valentineSticker}
                            alt="Valentine's Sticker"
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
                            src={valentineSticker}
                            alt="Valentine's Sticker"
                            className="absolute pointer-events-none select-none"
                            style={{
                                top: "0px",
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
                            src={valentineSticker}
                            alt="Valentine's Sticker"
                            className="absolute pointer-events-none select-none"
                            style={{
                                top: "-5px",
                                left: "0px",
                                width: "110%",
                                height: "110%",
                                objectFit: "cover"
                            }}
                        />
                    );
                default:
                    return null;
            }
        }


        return null;
    };



    const handleDownloadStrip = async () => {
        const element = document.getElementById("photo-strip-canvas");
        if (!element) {
            alert("Photo strip not found!");
            return;
        }

        try {
            // Get actual pixel dimensions of the element
            const rect = element.getBoundingClientRect();


            const canvas = await html2canvas(element, {
                useCORS: true,
                backgroundColor: null,

                scale: 3, // Optional: for higher resolution
            });


            canvas.toBlob((blob) => {
                if (blob) {
                    // ⬇️ Save to local
                    saveAs(blob, `PixieBooth-Strip-${layout}.png`);

                    // ⬇️ Also convert blob to DataURL and save to gallery
                    const reader = new FileReader();
                    reader.onloadend = async () => {
                        const base64data = reader.result;
                        await saveStripToGallery(base64data); // ✅ Send to backend
                    };
                    reader.readAsDataURL(blob);
                }
            });

        } catch (err) {
            console.error("❌ Failed to download:", err);
            alert("Something went wrong while downloading.");
        }
    };

    const handleDownloadGIF = async () => {
        const frames = [];

        for (let i = 0; i < photos.length; i++) {
            const tempDiv = document.createElement("div");
            tempDiv.style.position = "fixed";
            tempDiv.style.top = "-9999px"; // Hide offscreen
            document.body.appendChild(tempDiv);

            tempDiv.innerHTML = `
            <div id="temp-strip" style="
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 8px 4px 6px;
                width: 180px;
                border: 2px solid ${frameColorHexMap[selectedFrameColor]};
                background-color: ${frameColorHexMap[selectedFrameColor]};
                font-family: 'Fredoka', sans-serif;
            ">
                <img src="${photos[i]}" style="width: 147px; height: 110px; object-fit: contain;" />
                <p style="font-size: 9px; font-style: italic; text-align: center; margin-top: 4px;">
                    PixieBooth ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
                ${selectedSticker === "Girlypop"
                    ? `<img src="${girlypopSticker}" style="position: absolute; top: 0; left: 0; width: 100%; height: 105%; object-fit: cover; pointer-events: none;" />`
                    : ""
                }
            </div>
        `;

            const strip = tempDiv.querySelector("#temp-strip");

            const canvas = await html2canvas(strip, {
                backgroundColor: null,
                useCORS: true,
                scale: 2,
            });

            frames.push(canvas.toDataURL("image/png"));
            document.body.removeChild(tempDiv);
        }

        // Use first frame to get GIF size
        const img = new Image();
        img.src = frames[0];
        img.onload = function () {
            gifshot.createGIF(
                {
                    images: frames,
                    gifWidth: img.width,
                    gifHeight: img.height,
                    interval: 1.5,
                    numFrames: frames.length,
                },
                function (obj) {
                    if (!obj.error) {
                        const link = document.createElement("a");
                        link.href = obj.image;
                        link.download = "PixieBooth-Animated.gif";
                        link.click();
                    } else {
                        alert("❌ Failed to create GIF");
                    }
                }
            );
        };
    };









    return (
        <>
            <Navbar />
            <div className="relative min-h-screen bg-white pt-20 px-6 font-['Fredoka'] overflow-x-hidden">
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
                    <p className="text-xs border px-4 py-1 border-black mb-2 bg-[#f0dce7]">
                        {layoutText}
                    </p>

                    <h2 className="text-lg font-semibold mt-4 mb-6 ml-40 tracking-wide font-['Fredoka']">
                        Customize your photo strip
                    </h2>

                    <div className="flex flex-col md:flex-row w-full justify-start">

                        {/* LEFT: Photo Strip */}
                        <div className="flex justify-center md:justify-start w-full md:w-auto relative">
                            <div id="printable-strip">
                                <div
                                    id="photo-strip-canvas"
                                    className={`
                                        shadow-lg px-4 pt-4 pb-2 overflow-hidden relative
                                        ${String(layout) === "D"
                                            ? "w-auto -ml-6 -mt-14"
                                            : String(layout) === "C"
                                                ? "w-[200px] mt-2"
                                                : "w-[200px] -mt-14"}
                                            border-2 self-start
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
                                    {renderStickerPerLayout()}
                                </div>
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
                                    <button
                                        onClick={handleDownloadStrip}
                                        className="px-4 py-3 text-xs border border-black rounded-full bg-white hover:bg-pink-50 transition"
                                    >
                                        📄 Download Photo Strip
                                    </button>
                                    <button className="px-4 py-3 text-xs border border-black rounded-full bg-white hover:bg-pink-50 transition">
                                        📲 Download via QR Code
                                    </button>
                                    <button
                                        onClick={handleDownloadGIF}
                                        className="px-4 py-3 text-xs border border-black rounded-full bg-white hover:bg-pink-50 transition"
                                    >
                                        🎞 Download GIF
                                    </button>

                                    <button
                                        onClick={() => window.print()}
                                        className="px-4 py-3 text-xs border border-black rounded-full bg-white hover:bg-pink-50 transition"
                                    >
                                        🖨️ Print Photo Strip
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
