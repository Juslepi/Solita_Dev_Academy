import Link from "next/link";

type PageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params }: PageProps) => {
  const stationData = await getStation(params.id);
  const { Name, Address, DeparturesCount, ReturnsCount } = stationData;

  return (
    <div className="center_container">
      <div>
        <h3>{Name}</h3>
        <p>{Address}</p>
        <p>Departures: {DeparturesCount}</p>
        <p>Returns: {ReturnsCount}</p>
        <Link href={"/stations"}>Back</Link>
      </div>
    </div>
  );
};

export async function getStation(id: string) {
  const res = await fetch(`http://localhost:3001/stations/${id}`);
  return res.json();
}

export default page;
