import axios from 'axios';

const API_BASE_URL = "http://localhost:5000";  // ✅ Use your backend port

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// ✅ Attach token to every request automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// ✅ Register
export const registerUser = async (userData) => {
    const response = await api.post("/api/auth/register", userData);
    localStorage.setItem("authToken", response.data.token);
    return response.data;
};

// ✅ Login
export const loginUser = async (userData) => {
    const response = await api.post("/api/auth/login", userData);
    localStorage.setItem("authToken", response.data.token);
    return response.data;
};

// ✅ Get current user
export const getCurrentUser = async () => {
    const response = await api.get("/api/auth/me");
    return response.data;
};

// ✅ Update profile using Axios (not fetch)
export const updateUserProfile = async (userData) => {
    try {
        const response = await api.put("/api/user/update-profile", userData);
        return response.data;
    } catch (err) {
        throw new Error("Failed to update profile");
    }
};

// Upload profile image
export const uploadProfileImage = async (formData) => {
    const response = await fetch("http://localhost:5000/api/user/upload-profile", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Image upload failed");
    }

    return await response.json();
};

export default api;
