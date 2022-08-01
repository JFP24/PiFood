import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../../Redux/Action/action";
import styles from "./search.module.css";
import Swal from "sweetalert2";

export const SearchName = ({ paginado }) => {
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
      dispatch(getName(input.buscar.toLowerCase()));
      paginado(1);
      setInput({
        buscar: "",
      });
    } else {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Lo Siento, Debes colocar una busquedad",
      });
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        name="buscar"
        placeholder="Buscá tu receta...."
        onChange={handleInputChange}
        value={input.buscar.toLowerCase()}
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
