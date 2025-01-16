import { useEffect, useState, useRef, useContext } from "react";
import { createPortal } from "react-dom";
import { MainStore } from "../store/MainStore";

import Placeholder from "../assets/images/no-img-placeholder.png";

import axios from "axios";
import { Movie } from "../types";

import Play from "../assets/icons/Play.png";

interface Props {
  openModal: boolean;
}

export default function InfoModal({ openModal }: Props) {
  const {
    setSelectedMovieId,
    selectedMovieId,
    addMovieToList,
    removeMovieFromList,
    lists,
    isTVSeries,
  } = useContext(MainStore);

  const [movieData, setMovieData] = useState<Movie | null>(null);
  const [showSkeleton, setShowSkeleton] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const requestURL = `https://api.themoviedb.org/3/${
        (isTVSeries ? "tv/" : "movie/") + selectedMovieId
      }?append_to_response=videos&language=en-US`;

      const movie = await axios.get(requestURL);
      const trailerKey = movie.data.videos.results[0]?.key;

      const {
        id,
        title,
        backdrop_path,
        poster_path,
        overview,
        vote_average,
        release_date,
        genres,
        runtime,
      } = { ...movie.data };

      setMovieData({
        id,
        title,
        backdrop_path,
        poster_path,
        overview,
        vote_average,
        release_date,
        genres,
        runtime,
        trailerKey,
      });

      console.log(movie.data);
    };

    const loaderTimeout = setTimeout(() => {
      setShowSkeleton(true);
    }, 1000);

    fetchData();

    return () => clearTimeout(loaderTimeout);
  }, []);

  const modalRef = useRef<HTMLDialogElement | null>(null);
  const childrenRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (openModal) {
      window.addEventListener("keydown", handleKeyDown);
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openModal]);

  useEffect(() => {
    if (openModal) {
      const handleOutsideClick = (event: Event) => {
        if (event instanceof MouseEvent || event instanceof TouchEvent) {
          if (
            modalRef.current &&
            event.target instanceof Node &&
            !childrenRef.current?.contains(event.target)
          ) {
            closeModal();
          }
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
        document.removeEventListener("touchstart", handleOutsideClick);
      };
    }
  }, [openModal]);

  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const handleImgLoad = () => {
    setIsImgLoaded(true);
  };

  const closeModal = () => {
    setSelectedMovieId(0);
  };

  const addMovie = () => {
    addMovieToList("Favourites", selectedMovieId);
  };

  const removeMovie = () => {
    removeMovieFromList("Favourites", selectedMovieId);
  };

  return createPortal(
    <dialog
      className="w-[calc(100%-4rem)] max-w-5xl h-[calc(100%-4rem)] bg-neutral-900 border-none outline-none rounded-2xl flex flex-col overflow-hidden shadow backdrop:bg-black/50 backdrop:backdrop-blur-[2px]"
      ref={modalRef}
    >
      {!!movieData ? (
        <>
          <div
            className="w-full h-full relative shrink-0 flex flex-col justify-end p-12"
            ref={childrenRef}
          >
            <button
              className="text-5xl h-12 w-12 text-neutral-50 absolute top-6 right-6 hover:text-neutral-200 z-20 outline-none"
              onClick={closeModal}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <img
              src={
                movieData.backdrop_path
                  ? "https://image.tmdb.org/t/p/original" +
                    movieData.backdrop_path
                  : Placeholder
              }
              alt="Movie poster"
              className={
                "w-full absolute h-3/4 top-0 left-0 pointer-events-none object-cover select-none transition-all " +
                (isImgLoaded ? "opacity-100" : "opacity-0")
              }
              onLoad={handleImgLoad}
            />
            <div className="w-full absolute h-3/4 top-0 left-0 pointer-events-none object-cover z-10 bg-gradient-small"></div>
            <section className="w-full h-1/2 z-10 flex flex-col relative">
              <div>
                <h2 className="text-4xl font-bold text-neutral-50 select-none z-20">
                  {movieData.title}
                </h2>
                <div className="flex gap-6">
                  <a
                    href={
                      "https://www.youtube.com/watch?v=" + movieData.trailerKey
                    }
                    target="_blank"
                  >
                    <button className="flex items-center justify-center mt-6 gap-4 font-bold text-neutral-950 bg-neutral-50 rounded py-3 px-8 hover:bg-neutral-200">
                      <img src={Play} alt="" className="w-6 h-6" />
                      Play
                    </button>
                  </a>
                  {lists
                    .find((list) => list.name === "Favourites")
                    ?.movies.includes(selectedMovieId) ? (
                    <button
                      className="flex items-center justify-center mt-6 font-bold h-12 w-12 bg-neutral-50 text-neutral-900 border-2 border-neutral-50 rounded-full"
                      onClick={removeMovie}
                    >
                      <i className="fa-solid fa-check text-xl"></i>
                    </button>
                  ) : (
                    <button
                      className="flex items-center justify-center mt-6 font-bold h-12 w-12 text-neutral-300 hover:text-neutral-50 border-2 border-neutral-300 rounded-full hover:border-neutral-50"
                      onClick={addMovie}
                    >
                      <i className="fa-solid fa-plus text-xl"></i>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex mt-16 grow gap-8">
                <div className="grow">
                  <div className="flex flex-row gap-4">
                    <div
                      className={
                        "w-fit px-2 py-1 mb-4 font-semibold border-2 rounded-md " +
                        (movieData.vote_average > 7.5
                          ? "border-green-600 text-green-600"
                          : movieData.vote_average < 4
                          ? "border-red-600 text-red-600"
                          : "border-yellow-600 text-yellow-600")
                      }
                    >
                      {Math.round(movieData.vote_average * 100) / 100}
                    </div>
                    <div className="text-lg text-neutral-50 py-1">
                      {movieData.release_date?.slice(0, 4) || ""}
                    </div>
                    <div className="text-lg text-neutral-50 py-1">
                      {movieData.runtime} min.
                    </div>
                  </div>

                  <article className="text-neutral-50 h-44 overflow-y-auto scrollbar">
                    {movieData.overview}
                  </article>
                </div>
                <div className="flex flex-col gap-6 w-2/5 shrink-0">
                  <p className="font-semibold text-neutral-500">
                    Genres:{" "}
                    <span className="font-normal text-neutral-50">
                      {movieData.genres.map((genre, id) =>
                        id === movieData.genres.length - 1
                          ? `${genre.name}`
                          : `${genre.name}, `
                      )}
                    </span>
                  </p>
                  <p className="font-semibold text-neutral-500">
                    Release Date:{" "}
                    <span className="font-normal text-neutral-50">
                      {movieData.release_date}
                    </span>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </>
      ) : (
        showSkeleton && (
          <>
            <div
              className="w-full h-full relative shrink-0 flex flex-col justify-end p-12"
              ref={childrenRef}
            >
              <button
                className="text-5xl h-12 w-12 text-neutral-50 absolute top-6 right-6 hover:text-neutral-200 z-20 outline-none"
                onClick={closeModal}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              <div className="w-full absolute h-3/4 top-0 left-0 pointer-events-none object-cover z-10 bg-gradient-small"></div>
              <section className="w-full h-1/2 z-10 flex flex-col animate-pulse">
                <div>
                  <div className="w-64 h-12 bg-neutral-700 rounded-full mb-4"></div>
                  <div className="h-12 w-[136px] bg-neutral-700 rounded"></div>
                </div>
                <div className="flex mt-16 grow gap-8">
                  <div className="grow">
                    <div className="flex flex-row gap-4">
                      <div className="w-12 h-8 bg-neutral-700 rounded-md"></div>
                      <div className="w-20 mt-1 h-6 bg-neutral-700 rounded-full"></div>
                      <div className="w-16 mt-1 h-6 bg-neutral-700 rounded-full"></div>
                    </div>

                    <article>
                      <div className="w-96 h-6 bg-neutral-700 rounded-full mt-4"></div>
                      <div className="w-80 h-6 bg-neutral-700 rounded-full mt-2"></div>
                      <div className="w-96 h-6 bg-neutral-700 rounded-full mt-2"></div>
                    </article>
                  </div>
                  <div className="flex flex-col gap-6 w-2/5 shrink-0">
                    <div className="w-1/2 h-6 bg-neutral-700 rounded-full"></div>
                    <div className="w-1/2 h-6 bg-neutral-700 rounded-full"></div>
                  </div>
                </div>
              </section>
            </div>
          </>
        )
      )}
    </dialog>,
    document.getElementById("root")!
  );
}
