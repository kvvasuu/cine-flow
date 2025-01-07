import { Routes, Route } from "react-router";
import Navbar from "./Navbar";
import Home from "./Home/Home";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shows" element={<Home />} />
        <Route path="/movies" element={<Home />} />
        <Route path="/recent" element={<Home />} />
        <Route path="/my-list" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
