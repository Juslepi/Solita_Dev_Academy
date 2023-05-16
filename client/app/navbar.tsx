import Link from "next/link";
import styles from "./navbar.module.css";

const navbar = () => {
  return (
    <nav className={styles.container}>
      <h2>Helsinki City Bike App 🚲</h2>
      <ul>
        <li>
          <Link href={"/"}>Journeys</Link>
        </li>
        <li>
          <Link href={"/stations"}>Stations</Link>
        </li>
      </ul>
    </nav>
  );
};

export default navbar;
