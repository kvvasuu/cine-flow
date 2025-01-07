interface Props {
  movies: string[];
}

function SliderList({ movies }: Props) {
  return (
    <>
      <div className="w-full h-full bg-red-400">{movies}</div>
    </>
  );
}

export default SliderList;
