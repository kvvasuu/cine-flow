import { Movie } from "../types";
interface Props {
  movie: Movie;
  onClick: (index: number) => void;
}

function SliderListElementTall({ movie, onClick }: Props) {
  return (
    <div
      className="w-[284px] h-[30rem] flex flex-col relative shrink-0 overflow-hidden rounded group cursor-pointer snap-start"
      onClick={() => onClick(movie.id)}
    >
      <img
        className="w-full h-full absolute bottom-0 left-0 object-cover"
        src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
        alt={movie.title}
      />
      <div className="w-full h-3/5 absolute bottom-0 left-0 z-10 bg-gradient flex flex-col justify-end p-2 transition-all opacity-0 group-hover:opacity-100">
        <h3 className="font-bold text-2xl text-neutral-100 select-none">
          {movie.title}
        </h3>
      </div>
    </div>
  );
}

export default SliderListElementTall;
