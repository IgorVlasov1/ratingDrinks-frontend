import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCheckmarkCircle } from "react-icons/io";
import styles from "./createTag.module.css";
import { setCreateTagPopupDisplay } from "../../reducers/appReducer";
import { createTag } from "../../http/tagApi";
import UserActionsInfo from "../UIsmallComponents/UserActionsInfo";
const CreateTag = () => {
  const dispatch = useDispatch();
  const popupDisplay = useSelector((state) => state.app.createTagPopupDisplay);
  const [tagContent, setTagContent] = useState("");
  return (
    <form
      onClick={() => dispatch(setCreateTagPopupDisplay("none"))}
      className={styles.deletePopup}
      style={{ display: popupDisplay }}
    >
      <div
        className={styles.deletePopup__content}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <AiFillCloseCircle
          className={styles.deletePopup__close}
          onClick={() => {
            dispatch(setCreateTagPopupDisplay("none"));
          }}
        />

        <input
          value={tagContent}
          onChange={(e) => setTagContent(e.target.value)}
          name="title"
          className={styles.deletePopup__input}
          type="text"
          placeholder="Введите название тэга..."
        />
        <IoIosCheckmarkCircle
          onClick={() => {
            dispatch(createTag(tagContent));
            setTagContent("");
          }}
          className={styles.submitForm}
        />
      </div>
      <UserActionsInfo />
    </form>
  );
};

export default CreateTag;
