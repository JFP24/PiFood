import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postFood, getDiets } from "../../Redux/Action/action";
import Swal from "sweetalert2";
import styles from "./CreateFood.module.css";

const validate = (input, diets) => {
  let error = {};
  if (!input.name) {
    error.name = "El nombre es obligatorio";
  } else if (input.name.length < 3) {
    error.name = "El nombre debe tener al menos 3 caracteres";
  } else if (!input.healthScore) {
    error.healthScore = "El healthScore es obligatorio";
  } else if (input.healthScore.length >= 3) {
    error.healthScore = "El healthScore no debe ser tan grande";
  } else if (!input.steps) {
    error.steps = "Los pasos son obligatorios";
  } else if (!input.summary) {
    error.summary = "el resumen es  obligatorios";
  } else if (!diets) {
    error.diets = "debes tener almenos una dieta";
  }

  return error;
};

export const CreateFood = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dietas = useSelector((state) => state.diets);
  const [diets, setDiets] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    healthScore: "",
    dishTypes: "",
    steps: "",
    summary: "",
    image: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError(validate({ ...input, [e.target.name]: e.target.value }));
  };

  const addFood = {
    name: input.name,
    image: input.image,
    healthScore: input.healthScore,
    steps: input.steps,
    dishTypes: input.dishTypes,
    summary: input.summary,
    diets: diets,
  };

  // console.log(addFood.diets.length);
  function handleSubmit(e) {
    e.preventDefault(e);

    if (
      addFood.name.length > 1 &&
      addFood.healthScore.length > 1 &&
      addFood.summary.length > 1 &&
      addFood.steps.length > 1 &&
      addFood.diets.length > 0
    ) {
      dispatch(postFood(addFood));
      setInput({
        name: "",
        healthScore: "",
        dishTypes: "",
        steps: "",
        summary: "",
        image: "",
      });
      setDiets([]);
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Food create correctly!",
      });
      navigate("/home");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tal vez te falten espacios por llena!",
      });
    }
    //window.location.reload();
  }

  function handeSelect(e) {
    if (diets.length > 4) return alert("error de 5");
    if (!diets.includes(e.target.value)) {
      setDiets([...diets, e.target.value]);
    } else {
      alert("error");
    }
  }

  function handleDeleted(e) {
    e.preventDefault();
    setDiets(diets.filter((t) => t !== e.target.value));
  }

  return (
    <div className={styles.container}>
      <div className={styles.todo}>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
          <div>
            <label className={styles.label}>Name:</label>
            <input
              placeholder="Ingrese Name"
              type="text"
              name="name"
              value={input.name.toLowerCase()}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              //required
            />
            {error.name && <p className={styles.error}>{error.name}</p>}
          </div>
          <div>
            <label className={styles.label}>healthScore:</label>
            <input
              placeholder="Ingrese healthScore"
              type="number"
              name="healthScore"
              value={input.healthScore.toLowerCase()}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              //  required
            />
            {error.healthScore && (
              <p className={styles.error}>{error.healthScore}</p>
            )}
          </div>
          <div>
            <label className={styles.label}>dishTypes:</label>
            <input
              placeholder="Ingrese dishTypes"
              type="text"
              name="dishTypes"
              value={input.dishTypes.toLowerCase()}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              //    required
            />
          </div>
          <div>
            <label className={styles.label}>steps:</label>
            <input
              placeholder="Ingrese steps"
              type="text"
              name="steps"
              value={input.steps.toLowerCase()}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              //required
            />
            {error.steps && <p className={styles.error}>{error.steps}</p>}
          </div>
          <div>
            <label className={styles.label}>summary:</label>
            <input
              placeholder="Ingrese summary"
              type="text"
              name="summary"
              value={input.summary.toLowerCase()}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              //  required
            />
            {error.summary && <p className={styles.error}>{error.summary}</p>}
          </div>
          <div>
            <label className={styles.label}>image:</label>
            <input
              placeholder="Ingrese image"
              type="text"
              name="image"
              value={input.image.toLowerCase()}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              //required
            />
          </div>

          <div>
            <label className={styles.label}>Dietas</label>
            <select name="temp" onChange={(e) => handeSelect(e)}>
              <option>Dietas</option>
              {dietas.map((e) => (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              ))}
            </select>
            <div>
              {diets.map((e) => {
                return (
                  <div key={e}>
                    <div>
                      <p>{e}</p>
                      <button
                        name="diets"
                        value={e}
                        onClick={(e) => handleDeleted(e)}
                      >
                        x
                      </button>
                    </div>
                  </div>
                );
              })}
              {error.diets && <p className={styles.error}>{error.diets}</p>}
            </div>
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};
