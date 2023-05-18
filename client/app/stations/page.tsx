"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./page.module.css";
import Link from "next/link";
import useSorting from "../hooks/sorting";

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
  const { sortBy, sortOrder, changeSorting } = useSorting("Name");

  useEffect(() => {
    const getStations = async () => {
      const res = await axios.get(
        `http://localhost:3001/stations/${page}/10?sortBy=${sortBy}&sortOrder=${sortOrder}`
      );
      setStations(res.data);
    };

    getStations();
  }, [page, sortBy, sortOrder]);

  return (
    <main className={`${styles.container} center_container`}>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => changeSorting("Name")}>Station</th>
            <th onClick={() => changeSorting("Address")}>Address</th>
          </tr>
        </thead>
        {stations.map((station: Station) => (
          <tbody className="table_content" key={station._id}>
            <tr>
              <td className="large_cell">
                <Link href={`/stations/${station.ID}`}>{station.Name}</Link>
              </td>

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
