import { Routes, Route } from "react-router";
import Navbar from "./Navbar";
import Home from "./Home/Home";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Navbar />
      <div className="w-full overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shows" element={<Home />} />
          <Route path="/movies" element={<Home />} />
          <Route path="/recent" element={<Home />} />
          <Route path="/my-list" element={<Home />} />
        </Routes>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
