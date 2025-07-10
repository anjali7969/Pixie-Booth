import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bottomHeart from "../assets/images/bottom_heart.png";
import bottomRight from "../assets/images/bottom_right.png";
import footerWave from "../assets/images/footer.png";
import Navbar from "../components/navbar";

const UploadImages = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedLayout = location.state?.layout || "A";
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const fixedWidth = 150;
        const fixedHeight = 110;

        Promise.all(
            files.map((file) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const img = new Image();
                        img.onload = () => {
                            const canvas = document.createElement("canvas");
                            canvas.width = fixedWidth;
                            canvas.height = fixedHeight;
                            const ctx = canvas.getContext("2d");

                            // Ensure crisp image drawing
                            ctx.imageSmoothingEnabled = true;
                            ctx.imageSmoothingQuality = "high";

                            // Crop center
                            const aspect = img.width / img.height;
                            const frameAspect = fixedWidth / fixedHeight;

                            let sx, sy, sw, sh;

                            if (aspect > frameAspect) {
                                // Image is wider than frame
                                sh = img.height;
                                sw = img.height * frameAspect;
                                sx = (img.width - sw) / 2;
                                sy = 0;
                            } else {
                                // Image is taller than frame
                                sw = img.width;
                                sh = img.width / frameAspect;
                                sx = 0;
                                sy = (img.height - sh) / 2;
                            }

                            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, fixedWidth, fixedHeight);
                            const croppedBase64 = canvas.toDataURL("image/png");
                            resolve(croppedBase64);
                        };
                        img.src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                });
            })
        ).then((croppedImages) => {
            setSelectedImages(croppedImages);
        });
    };

    const handleSelect = () => {
        if (selectedImages.length === 0) {
            alert("Please upload at least one image.");
            return;
        }

        navigate("/photo-strip", {
            state: {
                layout: selectedLayout,
                photos: selectedImages,
            },
        });
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white pt-24 px-6 font-['Fredoka'] flex flex-col items-center overflow-x-hidden">
                <div className="flex flex-col items-center w-full max-w-6xl">
                    <div className="flex gap-10 justify-center w-full items-start">
                        {/* Left side */}
                        <div className="flex flex-col items-center w-full md:w-[45%]">
                            <div className="flex gap-4 mb-2">
                                <button
                                    className="px-4 py-2 rounded-full bg-white border border-black font-black text-xs tracking-wider"
                                    onClick={() => navigate("/camera")}
                                >
                                    CAMERA
                                </button>
                                <button className="px-4 py-2 rounded-full bg-[#FCD0DA] border border-black font-black text-xs tracking-wider">
                                    UPLOAD IMAGES
                                </button>
                            </div>

                            <p className="text-xs bg-[#F2E4EC] px-4 py-1 border border-black rounded mb-4">
                                Selected layout: Layout {selectedLayout}
                            </p>

                            <label
                                htmlFor="imageUpload"
                                className="mt-4 px-6 py-2 bg-[#FCD0DA] border border-black rounded-md text-black font-black text-sm tracking-wider hover:scale-105 transition cursor-pointer"
                            >
                                SELECT IMAGES
                                <input
                                    id="imageUpload"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>

                            {/* ✅ Preview under button */}
                            {selectedImages.length > 0 && (
                                <>
                                    <div className="flex flex-wrap gap-4 justify-center mt-6">
                                        {selectedImages.map((img, index) => (
                                            <div
                                                key={index}
                                                className="border border-black rounded overflow-hidden w-[140px] h-[110px] bg-white flex items-center justify-center"
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Selected ${index + 1}`}
                                                    className="w-[150px] h-[110px] object-cover rounded"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={handleSelect}
                                        className="mt-6 px-6 py-2 bg-[#FCD0DA] border border-black rounded-md text-black font-black text-sm tracking-wider hover:scale-105 transition"
                                    >
                                        CONTINUE
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Right side placeholder (unchanged) */}
                        <div className="flex flex-col mt-5 md:ml-7 items-center"></div>
                    </div>
                </div>

                {/* Decorations */}
                <img
                    src={bottomHeart}
                    alt="heart sticker"
                    className="absolute bottom-[60px] left-20 w-[170px] h-auto select-none pointer-events-none"
                />
                <img
                    src={bottomRight}
                    alt="right sparkles"
                    className="absolute bottom-[60px] right-10 w-[150px] h-auto select-none pointer-events-none"
                />
                <footer className="w-full absolute bottom-0 left-0">
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

export default UploadImages;
