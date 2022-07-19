import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFoods } from "../../Redux/Action/action";
import { Cards } from "../Cards/Cards";
import { Pagination } from "../Pagination/Pagination";
import { NavBar } from "../NavBar/Navbar";
import styles from "./Home.module.css";

import { Filters } from "../Filter/Filter";

export const Home = () => {
  const dispatch = useDispatch();
  const allFoods = useSelector((state) => state.allFoods);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); //numero de paginas actuales
  const [foodPerPage] = useState(10); // numero de recetas por pagina
  const indexOfLastCharacter = currentPage * foodPerPage; // 1 * 10 = 10 indice de la ultima recipe
  const indexOfFirstCharacter = indexOfLastCharacter - foodPerPage; //indice del segundo dato
  console.log(allFoods);
  const foodCurrent = allFoods.slice(
    //partimos las recetas en 10
    indexOfFirstCharacter,
    indexOfLastCharacter
  );
  const paginado = (pageNumber) => {
    // me ayuda al renderizado del paginado cambiando el estado
    setCurrentPage(pageNumber);
  };
  //console.log(foodCurrent);
  //console.log(allFoods);
  useEffect(() => {
    if (allFoods.length) {
      setLoading(false);
    }
  }, [allFoods]);

  useEffect(() => {
    dispatch(getAllFoods());
  }, [dispatch]);

  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div>
        <Filters />
      </div>
      <div>
        <Pagination
          foodPerPage={foodPerPage}
          allRecipes={allFoods.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      </div>
      <div className={styles.cards}>
        {loading ? (
          <div className={styles.container}>
            <img
              className={styles.gif}
              src="https://i.pinimg.com/originals/e0/28/ac/e028ac5fbb700a5db916af575672e954.gif"
              alt=""
            />
          </div>
        ) : foodCurrent.length > 0 ? (
          foodCurrent.map((d) => {
            return (
              <div key={d.id}>
                <Cards
                  id={d.id}
                  name={d.name}
                  image={d.image}
                  healthScore={d.healthScore}
                  diets={d.diets}
                />
              </div>
            );
          })
        ) : (
          <h1>No exiten recetas</h1>
        )}
      </div>
    </div>
  );
};
