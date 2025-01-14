import { useEffect, useState } from "react";

import axios from "axios";

import { Movie } from "../../types.tsx";

import SliderList from "../../components/SliderList.tsx";
import HighlightedMovie from "./HighlightedMovie.tsx";
import SliderListSkeleton from "../../components/skeletons/SliderListSkeleton.tsx";

export default function Home() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

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

        setNowPlayingMovies(nowPlayingResponse.data.results);
        setTopRatedMovies(topRatedResponse.data.results);
        setPopularMovies(popularResponse.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="w-full pb-8 flex flex-col gap-8">
        <HighlightedMovie movies={nowPlayingMovies}></HighlightedMovie>

        {popularMovies.length > 0 ? (
          <SliderList movies={popularMovies} category="Popular"></SliderList>
        ) : (
          <SliderListSkeleton></SliderListSkeleton>
        )}

        {topRatedMovies.length > 0 ? (
          <SliderList
            movies={topRatedMovies}
            category="Top Rated"
            isTall={true}
          ></SliderList>
        ) : (
          <SliderListSkeleton></SliderListSkeleton>
        )}
      </div>
    </>
  );
}
