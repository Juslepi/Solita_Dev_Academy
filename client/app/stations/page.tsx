"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./page.module.css";
import Link from "next/link";

export interface Station {
  _id: string;
  ID: number;
  Name: string;
  Address: string;
  Capacity: number;
  x: number;
  y: number;
}

const Page = () => {
  const [page, setPage] = useState(1);
  const [stations, setStations] = useState<Station[]>([]);
  const [sorting, setSorting] = useState({
    sort: "Name",
    sortOrder: "asc",
  });

  useEffect(() => {
    const getStations = async () => {
      const res = await axios.get(
        `http://localhost:3001/stations/${page}/10?sort=${sorting.sort}&sortOrder=${sorting.sortOrder}`
      );
      setStations(res.data);
    };

    getStations();
  }, [page, sorting]);

  // TODO - Look into this beauty
  const sortResults = (sortBy: string) => {
    if (sorting.sort === sortBy) {
      const newOrder = sorting.sortOrder === "asc" ? "desc" : "asc";
      setSorting({ ...sorting, sortOrder: newOrder });
    } else {
      setSorting({ ...sorting, sort: sortBy });
    }
  };

  return (
    <main className={`${styles.container} center_container`}>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => sortResults("Name")}>Station</th>
            <th onClick={() => sortResults("Address")}>Address</th>
          </tr>
        </thead>
        {stations.map((station: Station) => (
          <tbody className="table_content" key={station._id}>
            <tr>
              <Link href={`/stations/${station.ID}`}>
                <td className="large_cell">{station.Name}</td>
              </Link>
              <td className="large_cell">{station.Address}</td>
            </tr>
          </tbody>
        ))}
      </table>
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
        Page: {page}
        <button onClick={() => setPage((currentPage) => currentPage + 1)}>
          {">"}
        </button>
      </div>
    </main>
  );
};

export default Page;
