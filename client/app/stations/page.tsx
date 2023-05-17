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

  useEffect(() => {
    const getStations = async () => {
      const res = await axios.get(`http://localhost:3001/stations/${page}/10`);
      console.log(res.data);
      setStations(res.data);
    };

    getStations();
  }, [page]);

  return (
    <main className={`${styles.container} center_container`}>
      <table className="table">
        <thead>
          <tr>
            <th>Station</th>
            <th>Address</th>
          </tr>
        </thead>
        {stations.map((station: Station) => (
          <tbody className="table_content" key={station._id}>
            <tr>
              <Link href={`/stations/${station.ID}`}>
                <td>{station.Name}</td>
              </Link>
              <td>{station.Address}</td>
            </tr>
          </tbody>
        ))}
      </table>
      <div className={styles.toolbar}>
        <button onClick={() => setPage((currentPage) => currentPage - 1)}>
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
