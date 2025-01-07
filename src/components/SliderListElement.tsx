interface Props {
  name: string;
  img: string;
}

function SliderList({ name, img }: Props) {
  return (
    <div className="w-[284px] h-40 flex flex-col relative shrink-0 overflow-hidden rounded-sm group cursor-pointer snap-start">
      <img
        className="w-full h-full absolute top-0 left-0"
        src={img}
        alt={name}
      />
      <div className="w-full h-full absolute bottom-0 left-0 z-10 bg-gradient flex flex-col justify-end p-2 transition-all opacity-0 group-hover:opacity-100 rounded-sm">
        <h3 className="font-bold text-2xl text-neutral-100 select-none">
          {name}
        </h3>
      </div>
    </div>
  );
}

export default SliderList;
