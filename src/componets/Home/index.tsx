import styles from "./index.module.css";
import mainContent from "../../assets/mainContent.png";
import { Link } from "react-router-dom";

export const HomeComponent = () => {
  return (
    <section className={styles.background}>
      <main className={styles.main}>
        <h1 className={styles.title}>ToDo List</h1>
        <Link to="/to-do">
          <img className={styles.img} src={mainContent} alt="ToDo"/>
        </Link>
      </main>
    </section>
  );
};
