import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import styles from "./createVoting.module.css";
import { setCreateVotingPopupDisplay } from "../../reducers/appReducer";
import { getAllDrinksForAdmin } from "../../http/userApi";
import { createVoting } from "../../http/userApi";
const CreateVoting = () => {
  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const popupDisplay = useSelector(
    (state) => state.app.creatVotingPopupDisplay
  );
  const dispatch = useDispatch();
  const drinks = useSelector((state) => state.drinks.files);
  const [drinksInfo, setDrinksInfo] = useState(drinks);
  const [dateEnd, setDateEnd] = useState("");
  useEffect(() => {
    getAllDrinksForAdmin().then((data) => setDrinksInfo(data));
  }, []);

  const [title, setTitle] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [selects, setSelects] = useState([]);
  const [visibilityStatusVoting, setVisibilityStatusVoting] = useState(null);
  function handleAddCandidates(e) {
    let value = e.target.value;
    let newItem = { name: value, votes: 0 };
    setCandidates([...candidates, newItem]);
  }
  function handleAddSelects() {
    const availableDrinks = drinksInfo?.filter(
      (drink) => !selectedDrinks.includes(drink.title)
    );
    setSelects([
      ...selects,
      <>
        <p className={styles.candidateDefault}>Участник {selects.length + 1}</p>
        <select
          onChange={(e) => {
            setSelectedDrinks([...selectedDrinks, e.target.value]);
            handleAddCandidates(e);
          }}
        >
          {" "}
          <option selected disabled={true} value="">
            Напитки
          </option>
          {availableDrinks?.map((drink) => (
            <option key={drink.id} value={drink.title}>
              {drink.title}
            </option>
          ))}
        </select>
      </>,
    ]);
  }
  const [picture, setPicture] = useState("");
  function pictureUploadHandler(e) {
    const file = e.target.files[0];
    setPicture(file);
  }
  function votingVisibilityHandler(e) {
    setVisibilityStatusVoting(e.target.value);
  }
  console.log(visibilityStatusVoting);
  return (
    <form
      className={styles.deletePopup}
      onClick={() => {
        dispatch(setCreateVotingPopupDisplay("none"));
        setSelects([]);
        setCandidates([]);
        setTitle("");
        setSelectedDrinks([]);
        setVisibilityStatusVoting(null);
        setPicture("");
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
          <p>
            Создать голосование
            <AiFillCloseCircle
              className={styles.deletePopup__close}
              onClick={() => {
                setSelects([]);
                setCandidates([]);
                setTitle("");
                setSelectedDrinks([]);
                dispatch(setCreateVotingPopupDisplay("none"));
              }}
            />
          </p>
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          className={styles.deletePopup__input}
          type="text"
          placeholder="Введите название голосования"
        />
        <div className={styles.addСontender}>
          <p>Выберите участников</p>
          <AiOutlinePlusSquare
            style={
              selects.length >= drinksInfo?.length
                ? { display: "none" }
                : { display: "flex" }
            }
            className={styles.addIcon}
            onClick={handleAddSelects}
          />
        </div>
        <div className={styles.selectsContainer}>
          {selects.map((select) => select)}
        </div>
        <p className={styles.setDatePhrase}>
          Укажите дату окончания голосования
        </p>
        <input
          value={dateEnd}
          onChange={(e) => setDateEnd(e.target.value)}
          type="datetime-local"
        />
        <p className={styles.setFilePhraseBig}>
          Прикрепите фоновое изображение:*
        </p>

        <input
          accept="image/png, image/jpeg"
          onChange={(e) => pictureUploadHandler(e)}
          name="picture"
          className={styles.deletePopup__file}
          type="file"
          placeholder="Укажите цену"
        />
        <p className={styles.setFilePhraseSmall}>
          *При отсутствии фонового изображения будет использован стандартный фон
        </p>
        <p className={styles.setFilePhrase}>Укажите статус голосования</p>
        <div className={styles.selectsContainer}>
          <select defaultValue="" onChange={votingVisibilityHandler}>
            <option key="1" value="anon">
              Aнонимное
            </option>
            <option key="2" value="open">
              Открытое
            </option>
          </select>
        </div>
        <IoIosCheckmarkCircle
          onClick={() =>
            dispatch(
              createVoting(
                title,
                candidates,
                dateEnd,
                picture,
                visibilityStatusVoting
              )
            )
          }
          className={styles.submitForm}
        />
      </div>
    </form>
  );
};

export default CreateVoting;
