import { useEffect, useState, useRef } from "react";

import axios from "axios";
import { Movie } from "../types";

import Play from "../assets/icons/Play.png";

interface Props {
  movieId: number;
  openModal: boolean;
  closeModal: () => void;
}

function InfoModal({ movieId, openModal, closeModal }: Props) {
  const [movieData, setMovieData] = useState<Movie | null>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const movie = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
      );
      setMovieData(movie.data);
    };

    fetchData();
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

  return (
    <dialog
      className="w-[calc(100%-4rem)] max-w-5xl h-[calc(100%-4rem)] bg-neutral-900 border-none outline-none rounded-2xl flex flex-col overflow-hidden shadow"
      ref={modalRef}
    >
      {!!movieData && (
        <>
          <div
            className="w-full h-full relative shrink-0 flex flex-col justify-end p-12"
            ref={childrenRef}
          >
            <button
              className="text-5xl h-12 w-12 text-neutral-50 absolute top-6 right-6 hover:text-neutral-200 z-20"
              onClick={closeModal}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <img
              src={
                "https://image.tmdb.org/t/p/original" + movieData.backdrop_path
              }
              alt="Movie poster"
              className="w-full absolute h-3/4 top-0 left-0 pointer-events-none object-cover select-none"
            />
            <div className="w-full absolute h-3/4 top-0 left-0 pointer-events-none object-cover z-10 bg-gradient-small"></div>
            <section className="w-full h-1/2 z-10 flex flex-col">
              <div>
                <h2 className="text-4xl font-bold text-neutral-50 select-none z-20">
                  {movieData.title}
                </h2>
                <button className="flex items-center justify-center mt-6 gap-4 font-bold text-neutral-950 bg-neutral-50 rounded py-3 px-8 hover:bg-neutral-200">
                  <img src={Play} alt="" className="w-6 h-6" />
                  Play
                </button>
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
                      {movieData.release_date.slice(0, 4)}
                    </div>
                  </div>

                  <article className="text-neutral-50">
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
          {/* <section>
            <div className="flex flex-col items-start gap-4 z-10 w-1/2 max-w-2xl p-16">
              <h4 className="text-xl text-neutral-100">{movieData.overview}</h4>
              <div className="flex gap-4 mb-6">
                <button className="flex items-center justify-center gap-4 font-bold text-neutral-950 bg-neutral-50 rounded py-3 px-8 hover:bg-neutral-200">
                  <img src={Play} alt="" className="w-6 h-6" />
                  Play
                </button>
              </div>
            </div>
          </section> */}
        </>
      )}
    </dialog>
  );
}

export default InfoModal;
