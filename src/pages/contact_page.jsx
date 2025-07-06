import { useState } from "react";
import bottomHeart from "../assets/images/bottom_heart.png";
import footerWave from "../assets/images/footer.png";
import leftStar from "../assets/images/left_star.png";
import Navbar from "../components/Navbar";

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted: ", formData);
        alert("Message sent!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white font-['Fredoka'] pt-24">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    {/* Header */}
                    <h1 className="text-2xl font-bold bg-pink-300 py-4 px-8 shadow-[4px_4px_0px_0px_#000] w-fit mb-10 ml-4 md:ml-0">
                        CONTACT US
                    </h1>


                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Left Side Text */}
                        <div className="space-y-6 text-sm text-gray-700">
                            <p>
                                We’d love to hear from you! Whether it’s a question, suggestion, or issue,
                                feel free to reach out—your feedback helps us improve.
                            </p>
                            <p>
                                For commercial inquiries or collaborations, send us a message—we’d be happy to discuss!
                            </p>
                            <p className="flex items-center gap-2">
                                <span>📧</span> anjalishrestha373@gmail.com
                            </p>
                            <p className="flex items-center gap-2">
                                <span>📍</span> Sangla, Tokha
                            </p>
                        </div>

                        {/* Right Side Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="👤 Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border-2 border-pink-300 rounded-md px-4 py-2 focus:outline-pink-400 text-sm"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="📧 Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border-2 border-pink-300 rounded-md px-4 py-2 focus:outline-pink-400 text-sm"
                                required
                            />
                            <textarea
                                name="message"
                                placeholder="Write your message here... 📝"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                                className="w-full border-2 border-pink-300 rounded-md px-4 py-2 focus:outline-pink-400 text-sm"
                                required
                            ></textarea>
                            <button
                                type="submit"
                                className="bg-pink-400 text-white font-semibold px-6 py-2 rounded-md shadow hover:bg-pink-500"
                            >
                                SEND MESSAGE
                            </button>
                        </form>
                    </div>

                    {/* Bottom Decorations */}
                    <img
                        src={bottomHeart}
                        alt="bottom heart"
                        className="absolute bottom-20 left-10 w-60 opacity-90 z-10"
                    />
                    <img
                        src={leftStar}
                        alt="left star"
                        className="absolute top-20 right-20 w-40 opacity-90 z-10"
                    />

                </div>

                {/* Bottom Pattern */}
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

export default Contact;
