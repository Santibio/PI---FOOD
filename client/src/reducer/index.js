import {
  GET_RECIPES,
  DELETE_RECIPES,
  FILTER_BY,
  GET_DIETS,
  ORDER_BY,
} from "../actions";

const initialState = {
  recipes: [],
  recipiesDetail: {},
  diets: [],
  dietsSinBack: [
    "gluten free",
    "dairy free",
    "lacto ovo vegetarian",
    "vegan",
    "paleolithic",
    "whole 30",
    "pescatarian",
    "primal",
    "fodmap friendly",
    "vegetarian",
  ],
};
const cases = {}

cases[GET_RECIPES] = (state,payload)=>({...state, recipes:payload});
cases[DELETE_RECIPES] = (state, payload) => ({ ...state, recipes: payload });
cases[FILTER_BY] = (state, payload) => ({ ...state, recipes: payload });
cases[GET_DIETS] = (state, payload) => ({ ...state, diets: payload });
cases[ORDER_BY] = (state, payload) => {
  if (payload === "Asc")
    return {
      ...state,
      recipes: state.recipes.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      }),
    };
  if (payload === "Desc")
    return {
      ...state,
      recipes: state.recipes.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        return 0;
      }),
    };
};

export default function reducer(state = initialState, { type, payload }) {
  return cases[type] ? cases[type](state, payload) : state;
}