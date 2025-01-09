import { useEffect, useState } from "react";
import axios from "axios";

import { Movie } from "../types.tsx";

import SliderList from "../components/SliderList";
import HighlightedMovie from "./HighlightedMovie.tsx";
import InfoModal from "../components/InfoModal.tsx";

axios.interceptors.request.use((config) => {
  config.headers.Authorization =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGQ4ZDU2YTI1ZWYwYzcyMjgxMGI2MzI2NzJiMjgyZCIsIm5iZiI6MTczNjE4MzIwNC40NTQwMDAyLCJzdWIiOiI2NzdjMGRhNGVjYTg1YmQ1MDg3MmExYTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Jbnr86Dr-iRV44oLxUp5Z4jAR66uAsB1Z9D2l4eoKTE";
  return config;
});

const dummyMovie: Movie = {
  id: 1,
  title: "Sonic the Hedgehog 3",
  backdrop_path: "/zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg",
  poster_path: "/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg",
  overview:
    "Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched in every way, Team Sonic must seek out an unlikely alliance in hopes of stopping Shadow and protecting the planet.",
  release_date: "2024-12-20",
  vote_average: 7,
};

function Home() {
  const movies = [
    dummyMovie,
    dummyMovie,
    dummyMovie,
    dummyMovie,
    dummyMovie,
    dummyMovie,
    dummyMovie,
    dummyMovie,
    dummyMovie,
    dummyMovie,
    dummyMovie,
  ];

  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const nowPlaying = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=us"
      );
      setNowPlayingMovies(nowPlaying.data.results);

      const topRated = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=us"
      );
      setTopRatedMovies(topRated.data.results);
    };

    fetchData();
  }, []);

  const handleMovieClick = (id: number): void => {
    const fetchData = async () => {
      const movie = await axios.get(
        `https://api.themoviedb.org/3/find/external_id=${id}?external_source=imdb_id`
      );
      console.log(movie);
    };

    fetchData();

    console.log(movies[id].title);
  };

  return (
    <>
      <div className="w-full pb-8 flex flex-col gap-8">
        {nowPlayingMovies.length > 0 && (
          <HighlightedMovie movies={nowPlayingMovies}></HighlightedMovie>
        )}

        <SliderList
          movies={movies}
          category="Watch Again"
          onItemSelect={handleMovieClick}
        ></SliderList>
        {topRatedMovies.length > 0 && (
          <SliderList
            movies={topRatedMovies}
            category="Top 10"
            isTall={true}
            onItemSelect={handleMovieClick}
          ></SliderList>
        )}

        <SliderList
          movies={movies}
          category="My List"
          onItemSelect={handleMovieClick}
        ></SliderList>
      </div>
      <InfoModal movieId={1}></InfoModal>
    </>
  );
}

export default Home;
