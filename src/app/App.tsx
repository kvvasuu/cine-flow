import { Routes, Route, useLocation } from "react-router";
import Navbar from "./Navbar/Navbar.tsx";
import Home from "./Home/Home.tsx";
import Movies from "./Movies/Movies.tsx";
import Footer from "../components/Footer.tsx";
import MyLists from "./MyLists/MyLists.tsx";
import MovieModal from "../components/MovieModal.tsx";
import TVShows from "./TVShows/TVShows.tsx";
import { AnimatePresence } from "motion/react";
import useMainStore from "../store/Store.tsx";

import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${API_KEY}`;
  return config;
});

export default function App() {
  const selectedMovieId = useMainStore((state) => state.selectedMovieId);
  const selectedSeriesId = useMainStore((state) => state.selectedSeriesId);

  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/shows" element={<TVShows />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/recent" element={<Home />} />
          <Route path="/myLists" element={<MyLists />} />
        </Routes>
      </AnimatePresence>
      <Footer></Footer>
      {selectedMovieId > 0 && (
        <MovieModal openModal={!!selectedMovieId}></MovieModal>
      )}
      {selectedSeriesId > 0 && (
        <MovieModal openModal={!!selectedSeriesId}></MovieModal>
      )}
    </>
  );
}
