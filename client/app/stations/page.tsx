"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./page.module.css";
import Link from "next/link";
import useSorting from "../hooks/sorting";
import Toolbar from "../components/Toolbar";

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
  const [status, setStatus] = useState("second");
  const { sortBy, sortOrder, changeSorting } = useSorting("Name");

  useEffect(() => {
    const getStations = async () => {
      setStatus("");
      try {
        const res = await axios.get(
          `http://localhost:3001/stations/${page}/30?sortBy=${sortBy}&sortOrder=${sortOrder}`
        );
        setStations(res.data);
      } catch (e) {
        setStatus("Failed to fetch data");
      }
    };

    getStations();
  }, [page, sortBy, sortOrder]);

  const sort = (sortBy: string) => {
    changeSorting(sortBy);
    setPage(1);
  };

  return (
    <main className={`${styles.container} center_container`}>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => sort("Name")}>Station</th>
            <th onClick={() => sort("Address")}>Address</th>
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
      <Toolbar page={page} setPage={setPage} />
      {status ? status : ""}
    </main>
  );
};

export default Page;
