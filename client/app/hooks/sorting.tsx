import { useState } from "react";

const useSorting = (initialSortBy: string, initialSortOrder = "asc") => {
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);

  const changeSorting = (newSortBy: string) => {
    if (sortBy === newSortBy) {
      setSortOrder((sortOrder) => (sortOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(newSortBy);
    }
  };

  return { sortBy, sortOrder, changeSorting };
};

export default useSorting;
