import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bottomHeart from "../assets/images/bottom_heart.png";
import bottomRight from "../assets/images/bottom_right.png";
import footerWave from "../assets/images/footer.png";
import Navbar from "../components/Navbar";

const layoutPhotoCounts = {
    A: 4,
    B: 3,
    C: 2,
    D: 6,
};

const CameraCapture = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [countdown, setCountdown] = useState(3);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [activeFilter, setActiveFilter] = useState("none");
    const [capturedImages, setCapturedImages] = useState([]);
    const [isCapturing, setIsCapturing] = useState(false);
    const [timerDisplay, setTimerDisplay] = useState(null);

    const location = useLocation();
    const selectedLayout = location.state?.layout || "A";
    const totalPhotos = layoutPhotoCounts[selectedLayout] || 1;

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setStream(mediaStream);
            setIsCameraOn(true);
        } catch (err) {
            alert(`Camera error: ${err.name} - ${err.message}`);
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
            setIsCameraOn(false);
        }
    };

    useEffect(() => {
        startCamera();
        return () => stopCamera();
    }, []);

    const runCountdown = (seconds) => {
        return new Promise((resolve) => {
            let current = seconds;
            setTimerDisplay(current);
            const interval = setInterval(() => {
                current -= 1;
                setTimerDisplay(current);
                if (current <= 0) {
                    clearInterval(interval);
                    setTimerDisplay(null);
                    resolve();
                }
            }, 1000);
        });
    };

    const saveImageToGallery = async (imageUrl) => {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        try {
            await fetch("http://localhost:5000/api/gallery/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ imageUrl }),
            });
        } catch (err) {
            console.error("Failed to save image:", err);
        }
    };


    const startCapture = async () => {
        if (!videoRef.current) return;
        setCapturedImages([]); // Clear old
        setIsCapturing(true);

        const newImages = [];

        for (let i = 0; i < totalPhotos; i++) {
            await runCountdown(countdown);

            const canvas = canvasRef.current;
            const video = videoRef.current;

            if (canvas && video) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const context = canvas.getContext("2d");
                context.filter = activeFilter;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL("image/png");

                newImages.push(dataUrl);
                setCapturedImages((prev) => [...prev, dataUrl]); // live preview

                // ✅ Save to gallery if logged in
                const token = localStorage.getItem("authToken");
                if (token) {

                }
            }

            await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        setIsCapturing(false);

        navigate("/photo-strip", {
            state: {
                layout: selectedLayout,
                photos: newImages,
            },
        });
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white pt-24 px-6 font-['Fredoka'] flex flex-col items-center overflow-x-hidden">
                <div className="flex flex-col items-center w-full max-w-6xl">
                    <div className="flex gap-10 justify-center w-full items-start">
                        {/* Left: Camera and Controls */}
                        <div className="flex flex-col items-center w-full md:w-[45%]">
                            {/* Buttons */}
                            <div className="flex gap-4 mb-2">
                                <button className="px-4 py-2 rounded-full bg-[#FCD0DA] border border-black font-black text-xs tracking-wider">
                                    CAMERA
                                </button>
                                <button
                                    onClick={() => navigate("/upload-images", { state: { layout: selectedLayout } })}
                                    className="px-4 py-2 rounded-full bg-white border border-black font-black text-xs tracking-wider"
                                >
                                    UPLOAD IMAGES
                                </button>

                            </div>

                            <p className="text-xs bg-[#F2E4EC] px-4 py-1 border border-black rounded mb-4">
                                Selected layout: Layout {selectedLayout} ({totalPhotos} photos)
                            </p>

                            {/* Video Feed */}
                            <div className="w-[450px] h-[300px] border-2 border-black rounded-2xl overflow-hidden bg-black mb-4 relative">
                                {isCameraOn ? (
                                    <>
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            playsInline
                                            muted
                                            style={{ filter: activeFilter }}
                                            className="w-full h-full object-cover"
                                        />
                                        {timerDisplay !== null && (
                                            <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold bg-black bg-opacity-50">
                                                {timerDisplay}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white text-sm">
                                        Camera preview will appear here
                                    </div>
                                )}
                            </div>

                            {/* Countdown Select & Capture */}
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <label>Select Countdown Time:</label>
                                    <select
                                        className="border border-black rounded px-2 py-1"
                                        value={countdown}
                                        onChange={(e) => setCountdown(Number(e.target.value))}
                                    >
                                        <option value={3}>3s</option>
                                        <option value={5}>5s</option>
                                        <option value={10}>10s</option>
                                    </select>
                                </div>

                                <button
                                    disabled={isCapturing}
                                    onClick={startCapture}
                                    className="mt-2 px-6 py-2 bg-[#FCD0DA] border border-black rounded-md text-black font-black text-sm tracking-wider hover:scale-105 transition"
                                >
                                    {isCapturing ? "CAPTURING..." : "START CAPTURE"}
                                </button>
                            </div>

                            {/* Filters */}
                            <div className="mt-6 flex flex-wrap justify-center gap-3">
                                {[
                                    { name: "No Filter", value: "none" },
                                    { name: "B&W", value: "grayscale(100%)" },
                                    { name: "Vivid", value: "contrast(1.5) saturate(1.8)" },
                                    { name: "Vintage", value: "sepia(0.7) hue-rotate(-20deg)" },
                                    { name: "Soft", value: "brightness(1.1) blur(1px)" },
                                    { name: "Noir", value: "contrast(1.2) grayscale(1)" },
                                ].map(({ name, value }) => (
                                    <button
                                        key={name}
                                        onClick={() => setActiveFilter(value)}
                                        className="px-4 py-1 border border-black rounded-full text-sm hover:scale-105 transition"
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right: Captured Image Previews */}
                        <div className="flex flex-col mt-5 md:ml-7 items-center">
                            {selectedLayout === "D" ? (
                                // ✅ 3 rows × 2 columns for layout D
                                <div className="grid grid-cols-2 gap-4">
                                    {capturedImages.map((img, index) => (
                                        <div
                                            key={index}
                                            className="border border-black overflow-hidden w-[140px] h-[110px]"
                                        >
                                            <img
                                                src={img}
                                                alt={`Captured ${index + 1}`}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                // ✅ Vertical stack for other layouts
                                <div className="flex flex-col gap-4 items-center">
                                    {capturedImages.map((img, index) => (
                                        <div
                                            key={index}
                                            className="border border-black overflow-hidden w-full max-w-[140px]"
                                        >
                                            <img
                                                src={img}
                                                alt={`Captured ${index + 1}`}
                                                className="object-cover w-[160px] h-[120px]"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <canvas ref={canvasRef} style={{ display: "none" }} />

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

export default CameraCapture;
