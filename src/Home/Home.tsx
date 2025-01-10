import { useEffect, useState } from "react";
import axios from "axios";

import { Movie } from "../types.tsx";

import SliderList from "../components/SliderList";
import HighlightedMovie from "./HighlightedMovie.tsx";
import InfoModal from "../components/InfoModal.tsx";
import SliderListSkeleton from "../skeletons/SliderListSkeleton.tsx";

axios.interceptors.request.use((config) => {
  config.headers.Authorization =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGQ4ZDU2YTI1ZWYwYzcyMjgxMGI2MzI2NzJiMjgyZCIsIm5iZiI6MTczNjE4MzIwNC40NTQwMDAyLCJzdWIiOiI2NzdjMGRhNGVjYTg1YmQ1MDg3MmExYTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Jbnr86Dr-iRV44oLxUp5Z4jAR66uAsB1Z9D2l4eoKTE";
  return config;
});

function Home() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  const [selectedMovieId, setSelectedMovieId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const nowPlaying = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?append_to_response=videos&language=en-US&page=1&region=us"
      );
      setNowPlayingMovies(nowPlaying.data.results);

      const topRated = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&region=us"
      );
      setTopRatedMovies(topRated.data.results);

      const popular = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=2&region=us"
      );
      setPopularMovies(popular.data.results);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="w-full pb-8 flex flex-col gap-8">
        <HighlightedMovie
          movies={nowPlayingMovies}
          onItemSelect={(id) => setSelectedMovieId(id)}
        ></HighlightedMovie>

        {popularMovies.length > 0 ? (
          <SliderList
            movies={popularMovies}
            category="Popular"
            onItemSelect={(id) => setSelectedMovieId(id)}
          ></SliderList>
        ) : (
          <SliderListSkeleton></SliderListSkeleton>
        )}

        {topRatedMovies.length > 0 ? (
          <SliderList
            movies={topRatedMovies}
            category="Top Rated"
            isTall={true}
            onItemSelect={(id) => setSelectedMovieId(id)}
          ></SliderList>
        ) : (
          <SliderListSkeleton></SliderListSkeleton>
        )}

        {/* <SliderList
          movies={movies}
          category="My List"
          onItemSelect={handleMovieClick}
        ></SliderList> */}
      </div>
      {selectedMovieId > 0 && (
        <InfoModal
          movieId={selectedMovieId}
          openModal={!!selectedMovieId}
          closeModal={() => {
            setSelectedMovieId(0);
          }}
        ></InfoModal>
      )}
    </>
  );
}

export default Home;
