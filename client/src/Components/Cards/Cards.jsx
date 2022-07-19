import React from "react";
import { Link } from "react-router-dom";
import styles from "./Cards.module.css";

export const Cards = ({ id, image, name, diets, healthScore }) => {
  //  console.log(diets);
  return (
    <div className={styles.container}>
      <div className={styles.name}>{name.toUpperCase()}</div>
      <div>
        <img
          className={styles.image}
          src={
            image ||
            "https://s1.eestatic.com/2015/03/31/cocinillas/cocinillas_22257914_116018277_1706x960.jpg"
          }
          alt=""
        />
      </div>
      <div className={styles.diets}>
        Diets
        <br /> {diets.join(", ")}
      </div>
      <div className={styles.health}>HealthScore : {healthScore}</div>
      <Link to={`/CardDetail/${id}`}>
        <button className={styles.detalles}>Detalles</button>
      </Link>
    </div>
  );
};
