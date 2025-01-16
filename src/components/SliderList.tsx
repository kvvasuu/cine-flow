import { useRef, useState, useEffect, useContext } from "react";
import { MainStore } from "../store/MainStore.tsx";
import { Movie } from "../types.tsx";

import SliderListElement from "./SliderListElement.tsx";
import SliderListElementTall from "./SliderListElementTall.tsx";

interface Props {
  movies: Movie[];
  category: string;
  isTall?: boolean;
  isTV?: boolean;
}

export default function SliderList({ movies, category, isTall, isTV }: Props) {
  const { selectItem } = useContext(MainStore);

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
  }, []);

  const select = (id: number) => {
    let type = "movie";
    isTV ? (type = "tv") : "movie";
    selectItem(type, id);
  };

  return (
    <div className="w-full flex flex-col z-10 gap-2 relative">
      <h2 className="font-semibold text-xl text-neutral-100 px-16">
        {category}
      </h2>

      {showPrevButton && (
        <>
          <button
            onClick={scrollLeft}
            className={
              "absolute left-10 flex items-center justify-center text-5xl text-neutral-100/70 w-12 h-12  z-30 outline-none hover:text-neutral-100 " +
              (isTall ? "bottom-[216px]" : "bottom-[62px]")
            }
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <div
            className={
              "w-16 bg-gradient-slider absolute left-0 bottom-0 z-20 pointer-events-none rotate-180 " +
              (isTall ? "h-[30rem]" : "h-40")
            }
          ></div>
        </>
      )}
      {showNextButton && (
        <>
          <button
            onClick={scrollRight}
            className={
              "absolute right-10 flex items-center justify-center text-5xl text-neutral-100/70 w-12 h-12  z-30 outline-none hover:text-neutral-100 " +
              (isTall ? "bottom-[216px]" : "bottom-[62px]")
            }
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          <div
            className={
              "w-16 bg-gradient-slider absolute right-0 bottom-0 z-20 pointer-events-none " +
              (isTall ? "h-[30rem]" : "h-40")
            }
          ></div>
        </>
      )}

      <div
        className="w-full h-full flex items-center justify-start overflow-x-auto snap-x scroll-px-16 gap-2 px-16 no-scrollbar scroll-smooth"
        ref={sliderRef}
      >
        {movies.map((el) => {
          return isTall ? (
            <SliderListElementTall
              movie={el}
              key={el.id}
              onClick={(id) => select(id)}
            ></SliderListElementTall>
          ) : (
            <SliderListElement
              movie={el}
              key={el.id}
              onClick={(id) => select(id)}
            ></SliderListElement>
          );
        })}
      </div>
    </div>
  );
}
