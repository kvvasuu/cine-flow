import { useRef, useState, useEffect } from "react";
import { Movie } from "../../types.tsx";
import axios from "axios";

import SliderListElement from "../../components/SliderListElement.tsx";
import SliderListSkeleton from "../../components/skeletons/SliderListSkeleton.tsx";
import useMainStore from "../../store/Store.tsx";

interface Props {
  movies: { id: number; type: "movie" | "series" }[];
  name: string;
}

export default function List({ movies, name }: Props) {
  const setSelectedMovieId = useMainStore((state) => state.setSelectedMovieId);
  const setSelectedSeriesId = useMainStore(
    (state) => state.setSelectedSeriesId
  );
  const deleteList = useMainStore((state) => state.deleteList);

  const [moviesArray, setMoviesArray] = useState<Movie[]>([]);

  const sliderRef = useRef<HTMLDivElement | null>(null);

  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const scrollRight = () => {
    if (sliderRef.current) {
      if (sliderRef.current.scrollLeft >= sliderRef.current.scrollWidth) return;
      sliderRef.current.scrollLeft = sliderRef.current.scrollLeft + 292;
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      if (sliderRef.current.scrollLeft <= 0) return;
      sliderRef.current.scrollLeft = sliderRef.current.scrollLeft - 292;
    }
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      setShowPrevButton(sliderRef.current.scrollLeft >= 146);
      setShowNextButton(
        sliderRef.current.scrollLeft <
          sliderRef.current.scrollWidth - sliderRef.current.clientWidth
      );
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll);

      setShowPrevButton(slider.scrollLeft >= 146);
      setShowNextButton(
        slider.scrollLeft < slider.scrollWidth - slider.clientWidth
      );

      return () => {
        slider.removeEventListener("scroll", handleScroll);
      };
    }
  }, [moviesArray]);

  useEffect(() => {
    const fetchData = async () => {
      const moviePromises = movies.map((movie) =>
        axios.get(
          `https://api.themoviedb.org/3/${
            (movie.type === "series" ? "tv/" : "movie/") + movie.id
          }?append_to_response=videos&language=en-US`
        )
      );
      const movieResponses = await Promise.all(moviePromises);

      setMoviesArray(
        movieResponses.map((response) => {
          return {
            ...response.data,
            title: response.data.name || response.data.title,
            release_date:
              response.data.first_air_date || response.data.release_date,
            type: !!response.data.title ? "movie" : "series",
          };
        })
      );
    };

    fetchData();
  }, [movies]);

  const selectItem = (movie: Movie) => {
    movie.type === "series"
      ? setSelectedSeriesId(movie.id)
      : setSelectedMovieId(movie.id);
  };

  return (
    <>
      {movies.length <= 0 ? (
        <div className="w-full flex flex-col gap-2 px-16">
          <div className="flex  gap-2 justify-between">
            <h2 className="font-semibold text-xl text-neutral-100">{name}</h2>
            {name !== "Favourites" && (
              <button
                className="text-sm font-semibold text-neutral-100/70 hover:text-neutral-100"
                onClick={() => deleteList(name)}
              >
                Delete
              </button>
            )}
          </div>
          <p className="text-neutral-400 text-sm">
            There are no movies in this list yet.
          </p>
        </div>
      ) : moviesArray.length <= 0 ? (
        <SliderListSkeleton />
      ) : (
        <div className="w-full flex flex-col z-10 gap-2 relative">
          <div className="flex gap-2 justify-between px-16 mb-2 h-8">
            <h2 className="font-semibold text-xl text-neutral-100">{name}</h2>
            {name !== "Favourites" && (
              <button
                className="text-sm font-semibold text-neutral-100/70 hover:text-neutral-100"
                onClick={() => deleteList(name)}
              >
                Delete
              </button>
            )}
          </div>

          {showPrevButton && (
            <>
              <button
                onClick={scrollLeft}
                className="absolute left-10 flex items-center justify-center text-5xl text-neutral-100/70 w-12 h-12  z-30 outline-none hover:text-neutral-100 bottom-[62px]"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <div className="w-16 bg-gradient-slider absolute left-0 bottom-0 z-20 pointer-events-none rotate-180 h-44"></div>
            </>
          )}
          {showNextButton && (
            <>
              <button
                onClick={scrollRight}
                className="absolute right-10 flex items-center justify-center text-5xl text-neutral-100/70 w-12 h-12  z-30 outline-none hover:text-neutral-100 bottom-[62px]"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
              <div className="w-16 bg-gradient-slider absolute right-0 bottom-0 z-20 pointer-events-none h-44"></div>
            </>
          )}

          <div
            className="w-full h-full flex items-center justify-start overflow-x-auto snap-x scroll-px-16 gap-2 px-16 no-scrollbar scroll-smooth"
            ref={sliderRef}
          >
            {moviesArray.map((movie) => {
              return (
                <SliderListElement
                  item={movie}
                  key={movie.id}
                  onClick={() => selectItem(movie)}
                ></SliderListElement>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
