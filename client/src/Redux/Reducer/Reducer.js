import {
  GET_FOODS,
  GET_FOOD_DETAIL,
  CLEAN_DETAILS,
  GET_TYPE,
  GET_NAME,
  FILTER_BY_DIEST,
  ORDER_RECIPES,
} from "../Action/types";

const initialState = {
  allFoods: [],
  detailFood: {},
  diets: [],
  recipes: {},
  filterRecipes: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FOODS:
      return {
        ...state,
        allFoods: action.payload,
        recipes: action.payload,
        filterRecipes: action.payload,
      };

    case GET_FOOD_DETAIL:
      return {
        ...state,
        detailFood: action.payload,
      };
    case CLEAN_DETAILS:
      return {
        ...state,
        detailFood: action.payload,
      };
    case GET_TYPE:
      return {
        ...state,
        diets: action.payload,
      };

    case GET_NAME:
      return {
        ...state,
        allFoods: action.payload,
      };

    case FILTER_BY_DIEST:
      const allRecipes = [...state.filterRecipes];
      const dietsFilter =
        action.payload === "all"
          ? state.recipes
          : allRecipes.filter((el) => el.diets.includes(action.payload));
      return {
        ...state,
        allFoods: [...dietsFilter],
      };

    case ORDER_RECIPES:
      if (action.payload === "all") {
        return {
          ...state,
          allFoods: [...state.recipes],
        };
      }

      if (action.payload === "A-Z") {
        return {
          ...state,
          allFoods: [...state.allFoods].sort((prev, next) => {
            if (prev.name > next.name) return 1;
            if (prev.name < next.name) return -1;
            return 0;
          }),
        };
      }

      if (action.payload === "Z-A") {
        return {
          ...state,
          allFoods: [...state.allFoods].sort((prev, next) => {
            if (prev.name > next.name) return -1;
            if (prev.name < next.name) return 1;
            return 0;
          }),
        };
      }

      if (action.payload === "desc") {
        return {
          ...state,
          allFoods: [...state.allFoods].sort(
            (prev, next) => prev.healthScore - next.healthScore
          ),
        };
      }

      if (action.payload === "asc") {
        return {
          ...state,
          allFoods: [...state.allFoods].sort(
            (prev, next) => next.healthScore - prev.healthScore
          ),
        };
      } else {
        return { ...state, allFoods: [...state.allFoods] };
      }

    // eslint-disable-next-line no-fallthrough
    default:
      return state;
  }
};

export default rootReducer;
