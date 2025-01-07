import SliderListElement from "./SliderListElement.tsx";
import MoviePoster from "../assets/images/MoviePoster-small.png";

interface Props {
  movies: string[];
  category: string;
}

function SliderList({ movies, category }: Props) {
  return (
    <div className="w-full min-h-52 flex flex-col z-10 gap-2 relative">
      <div className="w-16 h-full bg-gradient-slider absolute right-0 z-20 pointer-events-none"></div>
      <h2 className="font-semibold text-xl text-neutral-100 px-16">
        {category}
      </h2>
      <div className="w-full h-full flex items-center justify-start overflow-x-auto snap-x scroll-px-16 gap-2 px-16 no-scrollbar">
        {movies.map((el, index) => {
          return (
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
