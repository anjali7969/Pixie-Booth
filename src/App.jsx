import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./pages/About_page";
import CameraCapture from "./pages/camera";
import Contact from "./pages/contact_page";
import Description from "./pages/description";
import Home from "./pages/home";
import LayoutSelection from "./pages/LayoutSelection";
import Login from "./pages/login";
import PhotoStrip from "./pages/photo_strip";
import Profile from "./pages/profile";
import Signup from "./pages/signup";
import UploadImages from "./pages/upload_image";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/description" element={<Description />} />
        <Route path="/layout" element={<LayoutSelection />} />
        <Route path="/camera" element={<CameraCapture />} />
        <Route path="/photo-strip" element={<PhotoStrip />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload-images" element={<UploadImages />} />


      </Routes>
    </Router>
  );
}

export default App;
