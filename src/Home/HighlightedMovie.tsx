import { useState, useEffect } from "react";

import SliderList from "../components/SliderList";
import { Movie } from "../types";

import Play from "../assets/icons/Play.png";
import Info from "../assets/icons/Info.png";

import HighligtedMovieSkeleton from "../skeletons/HighlightedMovieSkeleton";

interface Props {
  movies: Movie[];
  onItemSelect: (index: number) => void;
}

function HighligtedMovie({ movies, onItemSelect }: Props) {
  const [highlightedMovieIndex, setHighlightedMovieIndex] = useState(0);

  const handleMovieClick = (id: number): void => {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    setHighlightedMovieIndex(movieIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [movies.length]);

  if (movies.length > 0) {
    return (
      <section className="flex flex-col justify-end w-full h-[60rem] relative shrink-0 overflow-hidden">
        <img
          src={
            "https://image.tmdb.org/t/p/original" +
            movies[highlightedMovieIndex].backdrop_path
          }
          alt="Movie poster"
          className="w-full min-h-[60rem] absolute top-0 left-0 pointer-events-none object-cover"
        />
        <div className="w-full min-h-[60rem] absolute top-0 left-0 pointer-events-none object-cover z-10 bg-gradient-small"></div>
        <div className="flex flex-col items-start gap-4 z-10 w-1/2 max-w-2xl p-16">
          <h2 className="text-5xl font-bold text-neutral-50 select-none drop-shadow">
            {movies[highlightedMovieIndex].title}
          </h2>
          <h4 className="text-xl text-neutral-100 drop-shadow">
            {movies[highlightedMovieIndex].overview}
          </h4>
          <div className="flex gap-4 mb-6">
            <button className="flex items-center justify-center gap-4 font-bold text-neutral-950 bg-neutral-50 rounded py-3 px-8 hover:bg-neutral-200">
              <img src={Play} alt="" className="w-6 h-6" />
              Play
            </button>
            <button
              className="flex items-center justify-center gap-4 font-bold text-neutral-50 bg-neutral-50/30 hover:bg-neutral-50/40 rounded py-3 px-8"
              onClick={() => onItemSelect(movies[highlightedMovieIndex].id)}
            >
              <img src={Info} alt="" className="w-6 h-6" />
              More info
            </button>
          </div>
        </div>
        <SliderList
          movies={movies}
          category="Now playing"
          onItemSelect={handleMovieClick}
        ></SliderList>
      </section>
    );
  } else {
    return <HighligtedMovieSkeleton></HighligtedMovieSkeleton>;
  }
}

export default HighligtedMovie;
