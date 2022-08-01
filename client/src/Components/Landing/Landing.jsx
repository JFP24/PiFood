import React from "react";
import { Link } from "react-router-dom";
import styles from "./landing.module.css";

export const Landing = () => {
  return (
    <div className={styles.page}>
      <div className={styles.pagesdos}>
        <h1 className={styles.titulo}>FOOD API</h1>
        <Link to="/home">
          <button className={styles.buton}>HOME</button>
        </Link>
      </div>
    </div>
  );
};
