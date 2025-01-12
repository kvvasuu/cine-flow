import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar.tsx";
import Home from "./Home/Home.tsx";
import Footer from "../components/Footer.tsx";
import MyLists from "./MyLists/MyLists.tsx";

import { List } from "../types.tsx";

import axios from "axios";

import { MainStore } from "../store/MainStore";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${API_KEY}`;
  return config;
});

function App() {
  const [lists, setLists] = useState<List[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<number>(0);

  const updateLists = (listName: string) => {
    setLists((prevValue) => {
      const updatedLists = [...prevValue];
      updatedLists.unshift({
        name: listName,
        movies: [],
      });
      localStorage.setItem("lists", JSON.stringify(updatedLists));
      return updatedLists;
    });
  };

  const ctxValue = {
    lists: lists,
    selectedMovieId: selectedMovieId,
    setLists: updateLists,
    setSelectedMovieId: setSelectedMovieId,
  };

  useEffect(() => {
    const lists = localStorage.getItem("lists");
    if (lists) {
      setLists(JSON.parse(lists));
    }
  }, []);

  return (
    <MainStore.Provider value={ctxValue}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shows" element={<Home />} />
        <Route path="/movies" element={<Home />} />
        <Route path="/recent" element={<Home />} />
        <Route path="/myLists" element={<MyLists />} />
      </Routes>
      <Footer></Footer>
    </MainStore.Provider>
  );
}

export default App;
