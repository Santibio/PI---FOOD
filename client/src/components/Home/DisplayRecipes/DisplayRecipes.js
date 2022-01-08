import React, { memo, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteRecipes,
  filterBy,
  getRecipes,
  orderBy,
  searchRecepi,
  deleteRecipeDetail,
} from "../../../actions";
import Card from "./Card/Card";
import style from "./DisplayRecipes.module.css";
import Loading from "../../UI/Loading/Loading";
import ButtonPrev from "../../UI/ButtonsPage/ButtonPrev";
import ButtonNext from "../../UI/ButtonsPage/ButtonNext";

export const DisplayRecipes = memo(() => {
  const { filter, type, search } = useParams();
  const { recipes } = useSelector((state) => state);
  const NUM_PAGES = 9;
  const dispatch = useDispatch();

  useEffect(() => {
    if (filter === "order") return dispatch(orderBy(type));
    if (filter) {
      dispatch(deleteRecipes());
      return dispatch(filterBy(filter, type));
    }
    if (search) {
      console.log(search);
      return dispatch(searchRecepi(search));
    }
    dispatch(getRecipes());
     dispatch(deleteRecipeDetail());
  }, [dispatch, filter, type, search]);

  const [currentPage, setCurrentPage] = useState(0);
  const recipesPages = (recipe) => {
    return recipe?.slice(currentPage, currentPage + NUM_PAGES);
  };
  const nextPage = () => {
    if (recipes.length > currentPage + NUM_PAGES) {
      setCurrentPage(currentPage + NUM_PAGES);
    }
  };
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - NUM_PAGES);
    }
  };

  if (recipes.length === 0) return <Loading />;

  return (
    <>
      {recipes[0].msg ? (
        <div className={style.noFound_container}>
          <p>{recipes[0].msg}</p>
        </div>
      ) : (
        <>
          <div className={style.cards_container}>
            {recipesPages(recipes).map(({ id, name, image, diets }) => (
              <Card key={id} id={id} name={name} img={image} diets={diets} />
            ))}
          </div>

          <div className={style.buttons_container}>
            <ButtonPrev onClick={prevPage}>Previuos</ButtonPrev>
            <ButtonNext onClick={nextPage}>Next</ButtonNext>
          </div>
        </>
      )}
    </>
  );
});
