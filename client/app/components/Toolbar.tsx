import { Dispatch, SetStateAction } from "react";
import styles from "./Toolbar.module.css";

type ToolbarProps = {
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
};

const Toolbar = ({ setPage, page }: ToolbarProps) => {
  return (
    <div className={styles.toolbar}>
      <button
        onClick={() =>
          setPage((currentPage) =>
            currentPage > 1 ? currentPage - 1 : currentPage
          )
        }
      >
        {"<"}
      </button>
      <span>Page: {page}</span>
      <button onClick={() => setPage((currentPage) => currentPage + 1)}>
        {">"}
      </button>
    </div>
  );
};

export default Toolbar;
