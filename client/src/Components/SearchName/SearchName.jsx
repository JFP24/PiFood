import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../../Redux/Action/action";
import styles from "./search.module.css";

export const SearchName = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    buscar: "",
  });
  const handleInputChange = (e) => {
    setInput({
      [e.target.name]: e.target.value,
    });
  };
  const handleOnClick = async (e) => {
    e.preventDefault();
    if (input.buscar) {
      dispatch(getName(input.buscar));
      setInput({
        buscar: "",
      });
    } else {
      return alert("Colocar un busqueda");
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        name="buscar"
        placeholder="Buscá tu receta...."
        onChange={handleInputChange}
        value={input.buscar}
        autoComplete="off"
      ></input>
      <button onClick={handleOnClick} className={styles.buscar}>
        Buscar
      </button>
      <button
        className={styles.cargar}
        onClick={() => {
          window.location.reload();
        }}
      >
        CargarTodos
      </button>
    </div>
  );
};
