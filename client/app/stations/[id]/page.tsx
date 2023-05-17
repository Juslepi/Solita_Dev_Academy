type PageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params }: PageProps) => {
  const stationData = await getStation(params.id);
  const { Name, Address, DepartureCount, ReturnsCount } = stationData;

  return (
    <div className="center_container">
      <table>
        <thead>
          <th>Name</th>
          <th>Address</th>
          <th>Departures</th>
          <th>Returns</th>
        </thead>
        <tbody>
          <tr>
            <td>{Name}</td>
            <td>{Address}</td>
            <td>{DepartureCount}</td>
            <td>{ReturnsCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export async function getStation(id: string) {
  const res = await fetch(`http://localhost:3001/stations/${id}`);
  return res.json();
}

export default page;
