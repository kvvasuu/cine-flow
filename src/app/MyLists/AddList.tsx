import { useState, useContext, FormEvent } from "react";
import { MainStore } from "../../store/MainStore.tsx";

interface Props {
  onClose: () => void;
}

function AddList({ onClose }: Props) {
  const { setLists, lists } = useContext(MainStore);

  const [isTaken, setIsTaken] = useState(false);
  const [listName, setListName] = useState("");

  const handleListNameChange = (event: FormEvent<HTMLInputElement>) => {
    setListName(event.currentTarget?.value);
    setIsTaken(false);
  };

  const addList = () => {
    const nameTaken = lists.find(
      (list) => list.name.toUpperCase() === listName.toUpperCase().trim()
    );

    if (nameTaken) {
      setIsTaken(true);
      return;
    }

    setLists(listName.trim());
    closeModal();
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <div
      className="w-full h-full absolute top-0 left-0  bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="w-[calc(100%-4rem)] max-w-lg bg-neutral-900 border-none rounded-2xl flex flex-col overflow-hidden shadow px-12 pb-12 pt-7 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-5xl h-12 w-12 text-neutral-50 absolute top-6 right-6 hover:text-neutral-200 z-20 outline-none"
          onClick={closeModal}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 className="text-4xl text-center font-bold text-neutral-50 select-none mb-8">
          New list
        </h2>

        {isTaken && (
          <h5 className="text-xl text-center font-bold text-red-500 select-none mb-4">
            Name already taken. Try something else.
          </h5>
        )}

        <input
          type="text"
          value={listName}
          onChange={handleListNameChange}
          placeholder="Name"
          className="text-neutral-900 px-4 py-2 rounded-lg outline-none"
        />

        <button
          className="flex items-center justify-center mt-6 font-bold text-neutral-950 bg-neutral-50 rounded py-3 px-8 hover:bg-neutral-200"
          onClick={addList}
        >
          Add
        </button>
        <button
          className="flex items-center justify-center mt-4 font-bold text-neutral-400 py-2 px-8 hover:text-neutral-50"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddList;
