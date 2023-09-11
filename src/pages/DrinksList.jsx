import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCards, searchDrinks } from "../http/drinksApi";
import { setTotalCount, showLoader } from "../reducers/appReducer";
import DrinkCard from "./DrinkCard";
import styles from "./drinksList.module.css";

import { v4 as uuidv4 } from "uuid";
import Loader from "../components/UIsmallComponents/Loader";
const DrinksList = ({ options }) => {
  const drinks = useSelector((state) => state.drinks.files);
  const searchString = useSelector((state) => state.app.searchString);
  const loader = useSelector((state) => state.app.loader);
  if (loader) {
    return <Loader />;
  }
  return (
    <>
      {drinks.length === 0 ? (
        <div className={styles.defaultPhraseSearch}>
          {searchString &&
            options &&
            `По запросу "${searchString}" ничего не найдено`}
        </div>
      ) : (
        <div className={styles.drinksContainer}>
          {drinks &&
            drinks?.map((drink) => <DrinkCard key={uuidv4()} drink={drink} />)}
        </div>
      )}
    </>
  );
};

export default DrinksList;
