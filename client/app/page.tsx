"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import date from "date-and-time";
import styles from "./page.module.css";

export type Journey = {
  _id: string;
  Departure: string;
  Return: string;
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
      <table className="">
        {journeys.map((journey: Journey) => (
          <div key={journey._id}>
            <tr>
              <th>Departure Station</th>
              <th>Return Station Station</th>
              <th>Distance m.</th>
              <th>Duration min.</th>
            </tr>
            <tr>
              <td>{journey["Departure station name"]}</td>
              <td>{journey["Return station name"]}</td>
              <td>{(journey["Covered distance (m)"] / 1000).toFixed(2)}</td>
              <td>
                {date
                  .subtract(
                    new Date(journey.Return),
                    new Date(journey.Departure)
                  )
                  .toMinutes()
                  .toFixed(2)
                  .toString()}
              </td>
            </tr>
          </div>
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
      </table>
    </main>
  );
}
