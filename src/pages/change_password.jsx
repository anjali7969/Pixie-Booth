// ✅ FRONTEND - ChangePassword.jsx
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        const token = localStorage.getItem("authToken");
        if (!token) {
            toast.error("You are not logged in");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/user/change-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ oldPassword, newPassword }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Password changed successfully!");
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                toast.error(data.message || "Failed to change password");
            }
        } catch (err) {
            toast.error("Something went wrong");
            console.error(err);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 font-['Fredoka']">
            <ToastContainer position="top-center" autoClose={2000} />
            <h2 className="text-2xl font-bold mb-6 text-center">Change Password 🔐</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full border-2 border-pink-200 rounded-xl px-4 py-2"
                    required
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border-2 border-pink-200 rounded-xl px-4 py-2"
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border-2 border-pink-200 rounded-xl px-4 py-2"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-2 rounded-xl font-bold"
                >
                    Update Password ✨
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
