import { Routes, Route } from "react-router";
import { useContext } from "react";
import Navbar from "./Navbar/Navbar.tsx";
import Home from "./Home/Home.tsx";
import Movies from "./Movies/Movies.tsx";
import Footer from "../components/Footer.tsx";
import MyLists from "./MyLists/MyLists.tsx";
import MovieModal from "../components/MovieModal.tsx";
import TVShows from "./TVShows/TVShows.tsx";

import axios from "axios";

import { MainStore } from "../store/MainStore.tsx";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${API_KEY}`;
  return config;
});

export default function App() {
  const { selectedMovieId, selectedSeriesId } = useContext(MainStore);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shows" element={<TVShows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/recent" element={<Home />} />
        <Route path="/myLists" element={<MyLists />} />
      </Routes>
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
