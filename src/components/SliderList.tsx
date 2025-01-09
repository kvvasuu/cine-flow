import { useRef, useState, useEffect } from "react";

import SliderListElement from "./SliderListElement.tsx";
import SliderListElementTall from "./SliderListElementTall.tsx";
import MoviePoster from "../assets/images/MoviePoster-small.png";
import MoviePosterTall from "../assets/images/2.jpg";

interface Props {
  movies: string[];
  category: string;
  isTall?: boolean;
}

function SliderList({ movies, category, isTall }: Props) {
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

  return (
    <div className="w-full min-h-52 flex flex-col z-10 gap-2 relative">
      <div className="w-16 h-full bg-gradient-slider absolute right-0 z-20 pointer-events-none"></div>
      <div className="w-16 h-full bg-gradient-slider absolute left-0 z-20 pointer-events-none rotate-180"></div>
      <h2 className="font-semibold text-xl text-neutral-100 px-16">
        {category}
      </h2>

      {showPrevButton && (
        <button
          onClick={scrollLeft}
          className={
            "absolute left-10 flex items-center justify-center text-5xl text-neutral-100/70 w-12 h-12  z-30 outline-none hover:text-neutral-100 " +
            (isTall ? "bottom-[216px]" : "bottom-[62px]")
          }
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
      )}
      {showNextButton && (
        <button
          onClick={scrollRight}
          className={
            "absolute right-10 flex items-center justify-center text-5xl text-neutral-100/70 w-12 h-12  z-30 outline-none hover:text-neutral-100 " +
            (isTall ? "bottom-[216px]" : "bottom-[62px]")
          }
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      )}

      <div
        className="w-full h-full flex items-center justify-start overflow-x-auto snap-x scroll-px-16 gap-2 px-16 no-scrollbar scroll-smooth"
        ref={sliderRef}
      >
        {movies.map((el, index) => {
          return isTall ? (
            <SliderListElementTall
              name={el}
              img={MoviePosterTall}
              key={index}
            ></SliderListElementTall>
          ) : (
            <SliderListElement
              name={el}
              img={MoviePoster}
              key={index}
            ></SliderListElement>
          );
        })}
      </div>
    </div>
  );
}

export default SliderList;
