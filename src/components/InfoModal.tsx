interface Props {
  movieId: number;
}

function InfoModal({ movieId }: Props) {
  return <dialog>{movieId}</dialog>;
}

export default InfoModal;
