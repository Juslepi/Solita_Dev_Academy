"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./page.module.css";

export type Journey = {
  _id: string;
  departure: string;
  return: string;
  ["Departure station id"]: number;
  ["Departure station name"]: string;
  ["Return station id"]: number;
  ["Return station name"]: string;
  ["Covered distance (m)"]: number;
};

export default function Home() {
  const [page, setPage] = useState(1);
  const [journeys, setJourneys] = useState<Journey[]>([]);

  useEffect(() => {
    const getJourneys = async () => {
      const res = await axios.get(`http://localhost:3001/journeys/${page}/10`);
      console.log(res.data);
      setJourneys(res.data);
    };

    getJourneys();
  }, [page]);

  return (
    <main className={`center_container`}>
      <div className="">
        {journeys.map((journey: Journey) => (
          <div key={journey._id}>{`${journey["Departure station name"]} to ${
            journey["Return station name"]
          } distance: ${(journey["Covered distance (m)"] / 1000).toFixed(
            2
          )}km duration`}</div>
        ))}
        <div className={styles.toolbar}>
          <button onClick={() => setPage((currentPage) => currentPage - 1)}>
            {"<"}
          </button>
          Page: {page}
          <button onClick={() => setPage((currentPage) => currentPage + 1)}>
            {">"}
          </button>
        </div>
      </div>
    </main>
  );
}
