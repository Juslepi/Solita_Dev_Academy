"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import useSorting from "./hooks/sorting";
import { ThreeDots } from "react-loader-spinner";
import styles from "./page.module.css";

export type Journey = {
  _id: string;
  Departure: string;
  Return: string;
  Duration: number;
  ["Departure station id"]: number;
  ["Departure station name"]: string;
  ["Return station id"]: number;
  ["Return station name"]: string;
  ["Covered distance (m)"]: number;
};

export default function Home() {
  const [page, setPage] = useState(1);
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const { sortBy, sortOrder, changeSorting } = useSorting(
    "Departure+station+name"
  );

  useEffect(() => {
    const getJourneys = async () => {
      setIsLoading(true);
      setStatus("");
      try {
        const res = await axios.get(
          `http://localhost:3001/journeys/${page}/30?sortBy=${sortBy}&sortOrder=${sortOrder}`
        );
        setJourneys(res.data);
      } catch (e) {
        setStatus("Failed to fetch data");
      }
      setIsLoading(false);
    };

    getJourneys();
  }, [page, sortBy, sortOrder]);

  const sort = (sortBy: string) => {
    changeSorting(sortBy);
    setPage(1);
  };

  return (
    <main className={`${styles.container} center_container`}>
      {isLoading ? (
        <div className="center_container">
          <ThreeDots
            height="80"
            width="80"
            color="blue"
            ariaLabel="loading"
            wrapperClass="table"
          />
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => sort("Departure+station+name")}>
                Departure Station
              </th>
              <th onClick={() => sort("Return+station+name")}>
                Return Station
              </th>
              <th onClick={() => sort("Covered+distance+(m)")}>Distance km.</th>
              <th onClick={() => sort("Duration")}>Duration min.</th>
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
                <td className="small_cell">{journey.Duration.toFixed(1)}</td>
              </tr>
            </tbody>
          ))}
        </table>
      )}

      {status ? status : ""}
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
    </main>
  );
}
