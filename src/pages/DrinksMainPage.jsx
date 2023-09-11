import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getAllCards } from "../http/drinksApi";
import { getAllTags } from "../http/tagApi";
import {
  setPage,
  setPageLimit,
  setSearchStringValue,
  showLoader,
} from "../reducers/appReducer";
import DrinksList from "./DrinksList";
import styles from "./drinksMainPage.module.css";
import Pagination from "../components/Pagination";
import SelectedByUser from "../components/UIsmallComponents/SelectedByUser";
const DrinksMainPage = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const tagList = useSelector((state) => state.drinks.tags);
  const drinks = useSelector((state) => state.drinks.files);
  const limit = useSelector((state) => state.app.limit);
  const [limitPage, setLimitPage] = useState(limit);
  console.log("LIMIT", limitPage);
  const page = useSelector((state) => state.app.page);
  console.log("PAGE", page);
  useEffect(() => {
    dispatch(getAllTags());
  }, []);

  const options = tagList.map((el) => ({ value: el.id, label: el.tagContent }));

  const itemsPerPage = [
    {
      value: 5,
      label: "5",
    },
    {
      value: 15,
      label: "15",
    },
    {
      value: 25,
      label: "25",
    },
  ];
  useEffect(() => {
    const debouncedSearchChangeHandler = setTimeout(() => {
      dispatch(setSearchStringValue(search));
      dispatch(getAllCards(selectedOptions, search, page, limit));
    }, 500);

    return () => clearTimeout(debouncedSearchChangeHandler);
  }, [dispatch, search, selectedOptions, page, limit]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };
  const handleItemsPerPageChange = (e) => {
    setLimitPage(e.value);
    dispatch(setPage(1));
    dispatch(setPageLimit(e.value));
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <Select
          className={styles.searchSelect}
          onChange={handleSelectChange}
          options={options}
          isMulti={true}
          placeholder="Выберите тэги..."
        />

        <input
          className={styles.searchInput}
          value={search}
          onChange={handleInputChange}
          placeholder="Введите название..."
        />
        <Select
          className={styles.itemsNumSelect}
          options={itemsPerPage}
          onChange={handleItemsPerPageChange}
          placeholder="Карт на странице.."
        />
      </div>
      <DrinksList options={options} />
      {drinks.length > 0 && <Pagination />}
      <SelectedByUser />
    </>
  );
};

export default DrinksMainPage;
