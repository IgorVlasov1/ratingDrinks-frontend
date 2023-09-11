import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCheckmarkCircle } from "react-icons/io";
import styles from "./createDrink.module.css";
import { setCreateDrinkPopupDisplay } from "../../reducers/appReducer";
import { API_URL } from "../../config";
import { createDrinkCard } from "../../http/drinksApi";
import { getAllTags } from "../../http/tagApi";
import Select from "react-select";
import UserActionsInfo from "../UIsmallComponents/UserActionsInfo";
const CreateDrink = () => {
  const dispatch = useDispatch();
  console.log(API_URL);
  const tagList = useSelector((state) => state.drinks.tags);
  const [tags, setTags] = useState(tagList);

  let options = [];

  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);
  useEffect(() => {
    setTags(tagList);
  }, [tagList, dispatch]);
  options = tags.map((el) => ({ value: el.id, label: el.tagContent }));

  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };
  console.log(options);
  const popupDisplay = useSelector((state) => state.app.creatDrinkPopupDisplay);

  const [newDrink, setNewDrink] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [otherInfo, setOtherInfo] = useState([]);
  function addOtherInfo() {
    setOtherInfo([...otherInfo, { name: "", content: "", number: Date.now() }]);
  }
  function removeOtherInfo(number) {
    setOtherInfo(otherInfo.filter((el) => el.number !== number));
  }
  function changeOtherInfo(key, value, number) {
    setOtherInfo(
      otherInfo.map((el) =>
        el.number === number ? { ...el, [key]: value } : el
      )
    );
  }
  const [picture, setPicture] = useState("");
  console.log(newDrink);
  const changeHandler = (e) => {
    setNewDrink({ ...newDrink, [e.target.name]: e.target.value });
  };
  function pictureUploadHandler(e) {
    const file = e.target.files[0];
    setPicture(file);
    //   createDrinkCard(file);
  }
  console.log("Характеристки устройства", otherInfo);
  return (
    <form
      className={styles.deletePopup}
      onClick={() => {
        dispatch(setCreateDrinkPopupDisplay("none"));
        setNewDrink({ title: "", description: "", price: "" });
      }}
      style={{ display: popupDisplay }}
    >
      <div
        className={styles.deletePopup__content}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.deletePopup__header}>
          <div>Добавьте напиток</div>
          <div className={styles.deletePopup__title}>
            <AiFillCloseCircle
              className={styles.deletePopup__close}
              onClick={() => {
                setNewDrink({
                  title: "",
                  description: "",
                  price: "",
                });
                dispatch(setCreateDrinkPopupDisplay("none"));
              }}
            />
          </div>
        </div>

        <input
          value={newDrink.title}
          onChange={changeHandler}
          name="title"
          className={styles.deletePopup__input}
          type="text"
          placeholder="Введите название напитка..."
        />
        <p>Добавьте описание:</p>
        <textarea
          value={newDrink.description}
          onChange={changeHandler}
          name="description"
          className={styles.deletePopup__textArea}
          type="text"
          maxLength={300}
          placeholder="Введите описание..."
        />
        <p>Укажите цену:</p>
        <input
          value={newDrink.price}
          onChange={changeHandler}
          name="price"
          className={styles.deletePopup__input}
          type="text"
          placeholder="Укажите цену..."
        />
        <p>Выберите тэги</p>
        <Select
          value={selectedOptions}
          placeholder="Теги..."
          onChange={handleChange}
          options={options}
          isMulti={true}
        />
        <p>Прикрепите избображение:</p>
        <input
          accept="image/png, image/jpeg"
          onChange={(e) => pictureUploadHandler(e)}
          name="picture"
          className={styles.deletePopup__file}
          type="file"
        />
        <button
          className={styles.addCharacteristics}
          onClick={(e) => {
            e.preventDefault();
            addOtherInfo();
          }}
        >
          Добавить характеристики
        </button>
        {otherInfo.map((el) => (
          <div className={styles.addOtherInfoContainer}>
            <input
              onChange={(e) =>
                changeOtherInfo("name", e.target.value, el.number)
              }
              value={el.name}
              placeholder="Название характеристики..."
            />
            <input
              onChange={(e) =>
                changeOtherInfo("content", e.target.value, el.number)
              }
              value={el.content}
              placeholder="Характеристика..."
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                removeOtherInfo(el.number);
              }}
            >
              Удалить
            </button>
          </div>
        ))}
        <IoIosCheckmarkCircle
          onClick={() =>
            dispatch(
              createDrinkCard(newDrink, picture, otherInfo, selectedOptions)
            )
          }
          className={styles.submitForm}
        />
      </div>
      <UserActionsInfo />
    </form>
  );
};

export default CreateDrink;
