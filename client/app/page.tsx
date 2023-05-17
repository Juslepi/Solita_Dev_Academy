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
  const [sorting, setSorting] = useState({
    sort: "Name",
    sortOrder: "asc",
  });

  useEffect(() => {
    const getJourneys = async () => {
      const res = await axios.get(
        `http://localhost:3001/journeys/${page}/10?sort=${sorting.sort}&sortOrder=${sorting.sortOrder}`
      );
      setJourneys(res.data);
    };

    getJourneys();
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
            <th onClick={() => sortResults("Departure+station+name")}>
              Departure Station
            </th>
            <th onClick={() => sortResults("Return+station+name")}>
              Return Station
            </th>
            <th onClick={() => sortResults("Covered+distance+(m)")}>
              Distance km.
            </th>
            <th onClick={() => sortResults("Return+station+name")}>
              Duration min.
            </th>
          </tr>
        </thead>
        {journeys.map((journey: Journey) => (
          <tbody className="table_content" key={journey._id}>
            <tr>
              <td className="large_cell">
                {journey["Departure station name"]}
              </td>
              <td className="large_cell">{journey["Return station name"]}</td>
              <td className="small_cell">
                {(journey["Covered distance (m)"] / 1000).toFixed(2)}
              </td>
              <td className="small_cell">
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
}
