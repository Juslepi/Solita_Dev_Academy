"use client";
import Link from "next/link";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

type PageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params }: PageProps) => {
  const stationData = await getStation(params.id);
  const {
    Name,
    Address,
    DeparturesCount,
    ReturnsCount,
    x,
    y,
    AvgDeparturingLength,
    AvgReturningLength,
  } = stationData;

  return (
    <div className="center_container">
      <div className="">
        <h3>{Name}</h3>
        <p>{Address}</p>
        <p>Departures: {DeparturesCount}</p>
        <p>Returns: {ReturnsCount}</p>
        <p>
          Average departuring journey length:{" "}
          {(AvgDeparturingLength / 1000).toFixed(1)}km
        </p>
        <p>
          Average returning journey length:{" "}
          {(AvgReturningLength / 1000).toFixed(1)}km
        </p>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_KEY || ""}>
          <GoogleMap
            mapContainerStyle={{ width: "400px", height: "400px" }}
            center={{ lat: y, lng: x }}
            zoom={15}
          >
            <Marker position={{ lat: y, lng: x }}></Marker>
          </GoogleMap>
        </LoadScript>
        <Link href={"/stations"}>⬅ Back</Link>
      </div>
    </div>
  );
};

export async function getStation(id: string) {
  try {
    const res = await fetch(`http://localhost:3001/stations/${id}`);
    return res.json();
  } catch (e) {
    console.log(e);
  }
}

export default page;
