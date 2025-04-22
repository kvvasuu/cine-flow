import { useEffect, useState } from "react";
import axios from "axios";
import SliderList from "../../components/SliderList.tsx";
import HighlightedMovie from "./HighlightedMovie.tsx";
import SliderListSkeleton from "../../components/skeletons/SliderListSkeleton.tsx";
import { motion } from "motion/react"

export default function Home() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState(() =>
    JSON.parse(sessionStorage.getItem("nowPlayingMovies") || "[]")
  );
  const [topRatedMovies, setTopRatedMovies] = useState(() =>
    JSON.parse(sessionStorage.getItem("topRatedMovies") || "[]")
  );
  const [popularMovies, setPopularMovies] = useState(() =>
    JSON.parse(sessionStorage.getItem("popularMovies") || "[]")
  );
  const [loading, setLoading] = useState(
    !nowPlayingMovies.length || !topRatedMovies.length || !popularMovies.length
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nowPlayingResponse, topRatedResponse, popularResponse] =
          await Promise.all([
            axios.get(
              "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=us"
            ),
            axios.get(
              "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&region=us"
            ),
            axios.get(
              "https://api.themoviedb.org/3/movie/popular?language=en-US&page=2&region=us"
            ),
          ]);

        const nowPlaying = nowPlayingResponse.data.results;
        const topRated = topRatedResponse.data.results;
        const popular = popularResponse.data.results;

        sessionStorage.setItem("nowPlayingMovies", JSON.stringify(nowPlaying));
        sessionStorage.setItem("topRatedMovies", JSON.stringify(topRated));
        sessionStorage.setItem("popularMovies", JSON.stringify(popular));

        setNowPlayingMovies(nowPlaying);
        setTopRatedMovies(topRated);
        setPopularMovies(popular);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      fetchData();
    }
  }, [loading]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full pb-8 flex flex-col gap-8">
      <HighlightedMovie movies={nowPlayingMovies}></HighlightedMovie>

      {!loading && popularMovies.length > 0 ? (
        <SliderList movies={popularMovies} category="Popular"></SliderList>
      ) : (
        <SliderListSkeleton></SliderListSkeleton>
      )}

      {!loading && topRatedMovies.length > 0 ? (
        <SliderList
          movies={topRatedMovies}
          category="Top Rated"
          isTall={true}
        ></SliderList>
      ) : (
        <SliderListSkeleton></SliderListSkeleton>
      )}
    </motion.div>
  );
}
