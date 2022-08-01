import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postFood, getDiets } from "../../Redux/Action/action";
import styles from "./CreateFood.module.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
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
    setError(
      validate({ ...input, [e.target.name]: e.target.value }, { ...diets })
    );
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
        text: "Receta creada correctamente",
      });
      navigate("/home");
      // window.location.reload();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tal vez te falten espacios por llenar",
      });
    }
  }

  function handeSelect(e) {
    if (diets.length > 4)
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No puedes poner mas de 5 dietas",
      });
    if (!diets.includes(e.target.value)) {
      setDiets([...diets, e.target.value]);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No puedes poner la misma dieta",
      });
    }
  }

  function handleDeleted(e) {
    e.preventDefault();
    setDiets(diets.filter((t) => t !== e.target.value));
  }

  return (
    <div className={styles.container}>
      <div className={styles.todo}>
        <Link to={"/home"}>
          <button className={styles.button}>Back</button>
        </Link>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
          <div className={styles.name}>
            <div className={styles.namelabel}>Name</div>

            <input
              className={styles.input}
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
          <div className={styles.health}>
            <div className={styles.healthlabel}>HealthScore</div>
            <input
              className={styles.input}
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
          <div className={styles.dish}>
            <div className={styles.dishlabel}>DishTypes</div>
            <input
              className={styles.input}
              placeholder="Ingrese dishTypes"
              type="text"
              name="dishTypes"
              value={input.dishTypes.toLowerCase()}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              //    required
            />
          </div>

          <div className={styles.summary}>
            <div className={styles.summarylabel}>Summary</div>
            <textarea
              cols="30"
              rows="10"
              placeholder="Ingrese summary"
              type="text"
              name="summary"
              value={input.summary.toLowerCase()}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              //  required
            />
            {error.summary && (
              <p className={styles.errorsumary}>{error.summary}</p>
            )}
          </div>
          <div className={styles.steps}>
            <div className={styles.stepslabel}>Steps</div>

            <textarea
              cols="30"
              rows="10"
              placeholder="Ingrese steps"
              type="text"
              name="steps"
              value={input.steps.toLowerCase()}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              //required
            />
            {error.steps && <p className={styles.errorsteps}>{error.steps}</p>}
          </div>
          <div className={styles.image}>
            <div className={styles.imagelabel}>Image</div>

            <input
              className={styles.input}
              placeholder="Ingrese image"
              type="text"
              name="image"
              value={input.image.toLowerCase()}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              //required
            />
          </div>

          <div className={styles.dietas}>
            <div className={styles.dietaslabel}>Dietas</div>
            <select name="temp" onChange={(e) => handeSelect(e)}>
              <option>Dietas</option>
              {dietas.map((e) => (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              ))}
            </select>
            <div className={styles.diets}>
              {diets.map((e) => {
                return (
                  <div key={e} className={styles.e}>
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
          <button className={styles.create} type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
