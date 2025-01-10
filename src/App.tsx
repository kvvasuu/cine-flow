import { Routes, Route } from "react-router";
import Navbar from "./Navbar";
import Home from "./Home/Home";
import Footer from "./Footer";

import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${API_KEY}`;
  return config;
});

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
      <Footer></Footer>
    </>
  );
}

export default App;
