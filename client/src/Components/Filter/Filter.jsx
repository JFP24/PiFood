import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByDiets,
  getDiets,
  orderRecipes,
} from "../../Redux/Action/action";
import { SearchName } from "../SearchName/SearchName";
import styles from "./Filter.module.css";

export const Filters = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  //console.log(diets);

  const handleDiets = (e) => {
    e.preventDefault();
    dispatch(filterByDiets(e.target.value));
  };

  const handleOrder = (e) => {
    e.preventDefault();
    dispatch(orderRecipes(e.target.value));
  };

  useEffect(() => {
    dispatch(getDiets());
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <select onChange={(e) => handleOrder(e)} id="select-order">
          <option value="all">Order Alphabetically</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="desc">100-1</option>
          <option value="asc">1-100</option>
        </select>
      </div>

      <div>
        <SearchName />
      </div>
      <div>
        <select onChange={(e) => handleDiets(e)} id="select-diets" cla>
          <option value="all">All</option>
          {diets?.map((el) => {
            return (
              <option key={el.id} value={el.name}>
                {el.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};