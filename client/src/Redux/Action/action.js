import axios from "axios";
import {
  GET_FOODS,
  GET_FOOD_DETAIL,
  CLEAN_DETAILS,
  GET_TYPE,
  GET_NAME,
  FILTER_BY_DIEST,
  ORDER_RECIPES,
} from "./types.js";

//Get All the pokemons
export const getAllFoods = () => {
  return async (dispatch) => {
    try {
      const allFoods = await axios.get(`http://localhost:3001/recipes`);
      return dispatch({
        type: GET_FOODS,
        payload: allFoods.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getName = (name) => {
  return async (dispatch) => {
    try {
      const getName = await axios.get(
        `http://localhost:3001/recipes?name=${name}`
      );
      return dispatch({
        type: GET_NAME,
        payload: getName.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//Get details for id
export const getFoodId = (id) => {
  return async (dispatch) => {
    try {
      const foodDetail = await axios(`http://localhost:3001/recipes/${id}`);
      return dispatch({
        type: GET_FOOD_DETAIL,
        payload: foodDetail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const cleanDetails = () => {
  return {
    type: CLEAN_DETAILS,
    payload: {},
  };
};

export const postFood = (payload) => {
  return async () => {
    console.log(payload);
    try {
      const post = await axios.post("http://localhost:3001/recipe", payload);
      return post;
    } catch (error) {
      console.log(error);
    }
  };
};

//Types of pokemons
export const getDiets = () => {
  return async (dispatch) => {
    try {
      const diets = await axios.get("http://localhost:3001/diets");
      return dispatch({
        type: GET_TYPE,
        payload: diets.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterByDiets = (value) => {
  return async function (dispatch) {
    return dispatch({ type: FILTER_BY_DIEST, payload: value });
  };
};

export const orderRecipes = (value) => {
  return async function (dispatch) {
    return dispatch({ type: ORDER_RECIPES, payload: value });
  };
};
