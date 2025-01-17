import { Movie } from "../types";
import Placeholder from "../assets/images/no-img-placeholder.png";
interface Props {
  item: Movie;
  onClick: (index: number) => void;
}

export default function SliderListElement({ item, onClick }: Props) {
  return (
    <div
      className="w-[284px] h-40 flex flex-col relative shrink-0 overflow-hidden rounded group cursor-pointer snap-start"
      onClick={() => onClick(item.id)}
    >
      <img
        className="w-full h-full absolute bottom-0 left-0"
        src={
          item.backdrop_path
            ? "https://image.tmdb.org/t/p/original" + item.backdrop_path
            : Placeholder
        }
        alt={item.title}
      />
      <div className="w-full h-full absolute bottom-0 left-0 z-10 bg-gradient flex flex-col justify-end p-2 transition-all opacity-0 group-hover:opacity-100">
        <h3 className="font-bold text-2xl text-neutral-100 select-none">
          {item.title}
        </h3>
      </div>
    </div>
  );
}
