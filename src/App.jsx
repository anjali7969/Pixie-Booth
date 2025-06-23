import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./pages/About_page";
import CameraCapture from "./pages/camera";
import Description from "./pages/description";
import Home from "./pages/Home";
import LayoutSelection from "./pages/LayoutSelection";
import Login from "./pages/login";
import PhotoStrip from "./pages/photo_strip";
import Signup from "./pages/signup";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/description" element={<Description />} />
        <Route path="/layout" element={<LayoutSelection />} />
        <Route path="/camera" element={<CameraCapture />} />
        <Route path="/photo-strip" element={<PhotoStrip />} />

      </Routes>
    </Router>
  );
}

export default App;
