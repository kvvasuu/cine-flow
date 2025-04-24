import { useEffect, useState } from "react";
import { motion } from "motion/react";
import AddList from "./AddList.tsx";
import List from "./List.tsx";
import useMainStore from "../../store/Store.tsx";

export default function MyLists() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const listState = useMainStore((state) => state.listState);

  useEffect(() => {
    const fetchData = async () => {};

    fetchData();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full min-h-[calc(100vh-14rem)] pb-8 flex flex-col items-center justify-start gap-8 mt-20"
      >
        {listState.length === 0 && (
          <div className="w-full h-40 mt-16 flex items-center justify-center">
            <h2 className="font-semibold text-xl text-neutral-500 px-16 select-none">
              There are no lists yet.
            </h2>
          </div>
        )}
        {listState.length > 0 &&
          listState.map((list) => (
            <List key={list.name} movies={list.movies} name={list.name}></List>
          ))}
        <button
          className="px-24 pt-10 pb-6 flex flex-col items-center mt-8 justify-center gap-4 text-neutral-400 hover:text-neutral-50 transition-all border-2 border-neutral-400 hover:border-neutral-50 rounded-3xl"
          onClick={() => setIsModalVisible(true)}
        >
          <i className="fa-solid fa-plus text-5xl"></i>
          <p>Add list</p>
        </button>
      </motion.div>
      {isModalVisible && (
        <AddList onClose={() => setIsModalVisible(false)}></AddList>
      )}
    </>
  );
}
