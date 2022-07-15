import React from "react";
import { Link } from "react-router-dom";
import styles from "./Cards.module.css";

export const Cards = ({ id, image, name, diets, dishTypes }) => {
  //  console.log(diets);
  return (
    <div className={styles.container}>
      <div>{name.toUpperCase()}</div>
      <div>
        <img
          src={
            image ||
            "https://i.blogs.es/7cee91/recetas-caseras-verano/450_1000.webp"
          }
          alt=""
        />
      </div>
      <div>{diets.join(", ")}</div>
      <div>{dishTypes}</div>
      <Link to={`/CardDetail/${id}`}>
        <button>Detalles</button>
      </Link>
    </div>
  );
};
