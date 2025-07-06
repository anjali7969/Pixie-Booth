import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import blueFlower from "../assets/images/blue-flower.png";
import footerWave from "../assets/images/footer.png";
import leftStar from "../assets/images/left-star.png";
import pinkFlower from "../assets/images/pink-flower.png";
import Navbar from "../components/Navbar";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "", email: "", profileImage: "" });
    const [preview, setPreview] = useState("");
    const [activeTab, setActiveTab] = useState("profile");
    const [gallery, setGallery] = useState([]);
    // Inside component
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("pixiebooth_user"));
        if (userData) {
            setUser(userData);
            let profileImage = userData.profileImage;

            if (profileImage && !profileImage.startsWith("http")) {
                profileImage = `http://localhost:5000${profileImage}`;
            }


            setPreview(profileImage || "");
        }
    }, []);

    useEffect(() => {
        const fetchGallery = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) return;

            try {
                const res = await fetch("http://localhost:5000/api/gallery/my-gallery", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                if (data.success) {
                    setGallery(data.images);
                }
            } catch (err) {
                console.error("Failed to fetch gallery:", err);
            }
        };

        if (activeTab === "gallery") {
            fetchGallery();
        }
    }, [activeTab]);




    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUser((prev) => ({ ...prev, profileImage: file }));
        const previewURL = URL.createObjectURL(file);
        setPreview(previewURL);
    };

    const confirmLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("pixiebooth_user");
        toast.success(
            <div className="flex items-center gap-2">
                <span className="text-xl">✅</span>
                <span>Logged out successfully!</span>
            </div>,
            { icon: false }
        );

        setShowLogoutConfirm(false);
        setTimeout(() => navigate("/"), 1000);
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                toast.error("You are not logged in.");
                return;
            }

            let imageFileName = user.profileImage;

            if (user.profileImage instanceof File) {
                const formData = new FormData();
                formData.append("profilePicture", user.profileImage);

                const uploadRes = await fetch("http://localhost:5000/api/user/upload-profile", {
                    method: "POST",
                    body: formData,
                });

                const uploadData = await uploadRes.json();
                if (uploadRes.ok) {
                    imageFileName = `/public/uploads/profile/${uploadData.fileName}`;

                } else {
                    console.error("Upload error:", uploadData);
                    toast.error("Image upload failed.");
                    return;
                }
            }

            const response = await fetch("http://localhost:5000/api/user/update-profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    profileImage: imageFileName,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("pixiebooth_user", JSON.stringify(data.user));
                toast.success(
                    <div className="flex items-center gap-2">
                        <span className="text-xl">✅</span>
                        <span>Profile updated successfully!</span>
                    </div>,
                    { icon: false }
                );
            } else {
                console.error("Update error:", data);
                toast.error("Failed to update profile.");
            }
        } catch (err) {
            console.error("Error:", err);
            toast.error("An error occurred while updating profile.");
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer
                position="top-center"
                autoClose={2000}
                toastClassName={() =>
                    "bg-[#FCD0DA] text-[#4B2C3C] font-['Fredoka'] text-sm pt-3 pb-3 px-4 rounded-xl border border-[#FC98C9] shadow-[0_4px_12px_#FFABCC] relative overflow-hidden w-[260px] sm:w-[300px]"
                }
                bodyClassName={() => "text-sm font-medium px-2 pt-1"}
                progressClassName="!bg-[#FC98C9] !h-1 !absolute !top-0 !inset-x-0 rounded-t-xl"
            />
            {showLogoutConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 text-center font-['Fredoka']">
                        <h2 className="text-lg mb-4">Are you sure you want to logout?</h2>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={confirmLogout}
                                className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
                            >
                                Yes, Logout
                            </button>
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="h-screen flex flex-col bg-gradient-to-br from-pink-50 to-purple-50 font-['Fredoka'] relative">
                <main className="flex-1 flex items-center justify-center px-4 py-4 relative">
                    <div className="flex w-full max-w-6xl gap-6 items-stretch">
                        <div className="min-w-[300px] max-w-[300px] bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-6 mt-2 ml-16 flex flex-col justify-between">
                            <div>
                                <div className="relative mb-6 pt-2">
                                    <div className="w-24 h-24 mx-auto relative">
                                        <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-200 to-purple-200 border-4 border-pink-200 shadow-lg flex items-center justify-center text-3xl">
                                            {preview ? (
                                                <img
                                                    src={preview}
                                                    alt="Profile"
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            ) : (
                                                "👤"
                                            )}
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center shadow-md">
                                            <span className="text-white text-xs">✨</span>
                                        </div>
                                    </div>
                                    <h2 className="text-center text-lg mt-3 text-gray-800 font-bold truncate">
                                        {user.name || "User Name"}
                                    </h2>
                                    <p className="text-center text-xs text-gray-500 mt-1">Photobooth Member</p>
                                </div>

                                <div className="space-y-2 text-sm mt-10 w-full">
                                    {[
                                        { label: "Profile", icon: "👤", tab: "profile" },
                                        { label: "My Gallery", icon: "🖼️", tab: "gallery" },
                                        { label: "Change Password", icon: "🔒", tab: "password" },
                                    ].map((item) => (
                                        <div
                                            key={item.tab}
                                            onClick={() => setActiveTab(item.tab)}
                                            className={`flex items-center px-4 py-2 rounded-xl cursor-pointer transition-all duration-200 font-medium ${activeTab === item.tab
                                                ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white"
                                                : "text-gray-700 hover:bg-pink-100"
                                                }`}
                                        >
                                            <span className="mr-2">{item.icon}</span> {item.label}
                                        </div>
                                    ))}

                                    <div
                                        onClick={() => setShowLogoutConfirm(true)}
                                        className="text-gray-700 px-4 py-2 rounded-xl hover:bg-red-100 hover:text-red-600 cursor-pointer flex items-center transition-all duration-200"
                                    >
                                        <span className="mr-2">🚪</span> Logout
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="flex-1 relative max-w-xl mt-8 z-10">
                            <div className="mb-4">
                                <button
                                    onClick={() => navigate("/")}
                                    className="flex items-center text-gray-600 hover:text-pink-500 mb-4 text-sm"
                                >
                                    <span className="mr-1">←</span>
                                    Back to Home
                                </button>
                                <h1 className="text-2xl text-gray-800 font-bold mb-1">Edit Profile ✨</h1>
                                <p className="text-sm text-gray-600">
                                    Update your information and make your profile shine!
                                </p>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 relative">
                                <img
                                    src={leftStar}
                                    alt="star"
                                    className="absolute -right-60 -top-20 w-60 opacity-70 animate-bounce"
                                />
                                <div className="space-y-4">
                                    {activeTab === "profile" && (
                                        <>
                                            {/* Edit Profile form (keep as-is) */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={user.name}
                                                    onChange={handleChange}
                                                    className="w-full border-2 border-pink-200 rounded-lg px-4 py-2 focus:border-pink-400 focus:outline-none text-sm"
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={user.email}
                                                    onChange={handleChange}
                                                    className="w-full border-2 border-pink-200 rounded-lg px-4 py-2 focus:border-pink-400 focus:outline-none text-sm"
                                                    placeholder="Enter your email address"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                    Upload Profile Image
                                                </label>
                                                <div className="border-2 border-dashed border-pink-200 rounded-xl p-4 text-center hover:border-pink-400">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        className="hidden"
                                                        id="profile-upload"
                                                    />
                                                    <label htmlFor="profile-upload" className="cursor-pointer">
                                                        <div className="text-pink-400 mb-1 text-xl">📸</div>
                                                        <p className="text-xs text-gray-600">Click to upload or drag and drop</p>
                                                        <p className="text-[10px] text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                                                    </label>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleSave}
                                                className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-pink-500 hover:to-pink-600 text-sm transition-all shadow-md"
                                            >
                                                SAVE CHANGES ✨
                                            </button>
                                        </>
                                    )}

                                    {activeTab === "gallery" && (
                                        <>
                                            <h1 className="text-2xl text-gray-800 font-bold mb-2">
                                                My Gallery <span role="img" aria-label="camera">📸</span>
                                            </h1>
                                            <p className="text-sm text-gray-600 mb-4">
                                                These are the images you've captured!
                                            </p>

                                            {/* Scrollable gallery container */}
                                            <div className="w-full max-w-[600px] h-[250px] overflow-y-auto border border-gray-300 p-4 rounded-lg shadow bg-white">
                                                {gallery.length === 0 ? (
                                                    <p className="text-gray-500 text-center">
                                                        No photos yet. Start clicking some 📷
                                                    </p>
                                                ) : (
                                                    <div className="flex flex-col gap-3">
                                                        {gallery.map((img) => (
                                                            <div
                                                                key={img._id}
                                                                className="flex items-center gap-4 p-2 border border-gray-200 rounded-md shadow-sm bg-gray-50"
                                                            >
                                                                <img
                                                                    src={img.imageUrl}
                                                                    alt="Captured"
                                                                    className="w-28 h-20 object-cover rounded border"
                                                                />
                                                                <div className="flex flex-col justify-center">
                                                                    <p className="text-xs text-gray-600 mb-1">
                                                                        {new Date(img.createdAt).toLocaleString()}
                                                                    </p>
                                                                    <a
                                                                        href={img.imageUrl}
                                                                        download={`PixieBooth-${img._id}.png`}
                                                                        className="text-blue-500 text-sm underline hover:text-blue-700"
                                                                    >
                                                                        Download
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}





                                    {activeTab === "password" && (
                                        <>
                                            <h1 className="text-2xl text-gray-800 font-bold mb-1">Change Password ✨</h1>
                                            <p className="text-sm text-gray-600 mb-4">
                                                Update your password to keep your account secure!
                                            </p>

                                            <div className="h-[250px] space-y-4">
                                                {/* Old Password */}
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                        Old Password *
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type={showOldPassword ? "text" : "password"}
                                                            name="oldPassword"
                                                            value={user.oldPassword || ""}
                                                            onChange={(e) => setUser({ ...user, oldPassword: e.target.value })}
                                                            className="w-full border-2 border-pink-200 rounded-lg px-4 py-2 focus:border-pink-400 focus:outline-none text-sm pr-10"
                                                            placeholder="Enter your current password"
                                                        />
                                                        <span
                                                            onClick={() => setShowOldPassword(!showOldPassword)}
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                                        >
                                                            {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* New Password */}
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                        New Password *
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type={showNewPassword ? "text" : "password"}
                                                            name="newPassword"
                                                            value={user.newPassword || ""}
                                                            onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
                                                            className="w-full border-2 border-pink-200 rounded-lg px-4 py-2 focus:border-pink-400 focus:outline-none text-sm pr-10"
                                                            placeholder="Enter your new password"
                                                        />
                                                        <span
                                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                                        >
                                                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Submit */}
                                                <div className="pt-3">
                                                    <button
                                                        type="button"
                                                        onClick={async () => {
                                                            const token = localStorage.getItem("authToken");
                                                            const res = await fetch("http://localhost:5000/api/auth/change-password", {
                                                                method: "PUT",
                                                                headers: {
                                                                    "Content-Type": "application/json",
                                                                    Authorization: `Bearer ${token}`,
                                                                },
                                                                body: JSON.stringify({
                                                                    oldPassword: user.oldPassword,
                                                                    newPassword: user.newPassword,
                                                                }),
                                                            });

                                                            const data = await res.json();
                                                            if (res.ok) {
                                                                toast.success("Password changed successfully 🎉");
                                                                setUser({ ...user, oldPassword: "", newPassword: "" });
                                                            } else {
                                                                toast.error(data.message || "Failed to change password.");
                                                            }
                                                        }}
                                                        className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-pink-500 hover:to-pink-600 text-sm transition-all shadow-md"
                                                    >
                                                        CHANGE PASSWORD 🔒
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-20 right-10 w-40 opacity-90 animate-pulse z-0">
                        <img src={pinkFlower} alt="flower" />
                    </div>
                    <div className="absolute -bottom-0 left-10 w-32 opacity-80 z-0">
                        <img src={blueFlower} alt="blue flower" />
                    </div>
                </main>
                <footer className="w-full">
                    <img src={footerWave} alt="footer design" className="w-full object-cover h-[30px]" />
                </footer>
            </div>
        </>
    );
};

export default Profile;
