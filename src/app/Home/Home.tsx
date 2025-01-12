import { useEffect, useState, useContext } from "react";
import { MainStore } from "../../store/MainStore.tsx";
import axios from "axios";

import { Movie } from "../../types.tsx";

import SliderList from "../../components/SliderList.tsx";
import HighlightedMovie from "./HighlightedMovie.tsx";
import InfoModal from "../../components/InfoModal.tsx";
import SliderListSkeleton from "../../components/skeletons/SliderListSkeleton.tsx";

function Home() {
  const { selectedMovieId, setSelectedMovieId } = useContext(MainStore);

  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

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
      {selectedMovieId > 0 && (
        <InfoModal openModal={!!selectedMovieId}></InfoModal>
      )}
    </>
  );
}

export default Home;
