import React from "react";
import { Link } from "react-router-dom";

import styles from "./NavBar.module.css";

export const NavBar = () => {
  return (
    <div className={styles.container}>
      <div>
        <div>FOOD</div>
      </div>

      <Link to={"/CreateFood"}>
        <button>CrearReceta</button>
      </Link>
    </div>
  );
};
