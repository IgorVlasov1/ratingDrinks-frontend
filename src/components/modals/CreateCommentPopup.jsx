import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCheckmarkCircle } from "react-icons/io";
import styles from "./createCommentPopup.module.css";
import {
  setCreateCommentPopupDisplay,
  setUserActionsInfo,
} from "../../reducers/appReducer";
import { sendComment } from "../../http/commentsApi";
import { AiFillDelete } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config";
import { createDrinkCard } from "../../http/drinksApi";
import UserActionsInfo from "../UIsmallComponents/UserActionsInfo";
const CreateCommentPopup = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = currentUser.id;
  const { id } = useParams();
  const popupDisplay = useSelector(
    (state) => state.app.createCommentPopupDisplay
  );
  const [commentTextContent, setCommentTextContent] = useState("");
  const [picture, setPicture] = useState([]);
  const [pictureUrls, setPictureUrls] = useState([]);
  const [commentLimit, setCommentLimit] = useState(0);
  const [dragEnter, setDragEnter] = useState(false);
  function pictureUploadHandler(e) {
    const file = e.target.files;
    const urls = [];
    for (let i = 0; i < file.length; i++) {
      urls.push(URL.createObjectURL(file[i]));
    }
    setPicture(file);
    setPictureUrls(urls);
    //   createDrinkCard(file);
  }
  useEffect(() => {
    return () => {
      pictureUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [pictureUrls]);

  console.log(picture);
  console.log(pictureUrls, "ссылки на изображения");

  function commentHandler() {
    if (picture.length > 4 || commentTextContent == "") {
      dispatch(setUserActionsInfo("Форма заполнена неккоректно", "flex"));
    } else {
      const formData = new FormData();
      formData.append("text", commentTextContent);
      formData.append("userId", userId);
      formData.append("drinkId", id);
      if (picture.length > 0) {
        for (let i = 0; i < picture.length; i++) {
          formData.append("pictures", picture[i]);
        }
      }
      dispatch(sendComment(formData));
    }
  }
  function commentInputHandler(e) {
    const inputValue = e.target.value;
    setCommentTextContent(e.target.value);
    setCommentLimit(inputValue.length);
  }

  function removePictureHandler(index) {
    const newPictures = [...picture];
    newPictures.splice(index, 1);
    setPicture(newPictures);
    const newUrls = [...pictureUrls];
    newUrls.splice(index, 1);
    setPictureUrls(newUrls);
  }

  function dragEnterHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true);
  }
  function dragLeaveHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(false);
  }
  function dragOverHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true);
  }
  function dropHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    const file = [...e.dataTransfer.files];
    const urls = [];
    for (let i = 0; i < file.length; i++) {
      urls.push(URL.createObjectURL(file[i]));
    }
    setPicture(file);
    setPictureUrls(urls);
    setDragEnter(false);
    //   createDrinkCard(file)
  }

  return (
    <form
      className={styles.deletePopup}
      onClick={() => {
        dispatch(setCreateCommentPopupDisplay("none"));
        setCommentTextContent("");
        setCommentLimit(0);
        setPictureUrls([]);
        setPicture([]);
      }}
      style={{ display: popupDisplay }}
    >
      <div
        onDragEnter={dragEnterHandler}
        onDragLeave={dragLeaveHandler}
        onDragOver={dragOverHandler}
        className={styles.deletePopup__content}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.deletePopup__header}>
          <div>Создать комментарий</div>
          <div className={styles.deletePopup__title}>
            <AiFillCloseCircle
              className={styles.deletePopup__close}
              onClick={() => {
                dispatch(setCreateCommentPopupDisplay("none"));
                setCommentLimit(0);
                setCommentTextContent("");
                setPictureUrls([]);
                setPicture([]);
              }}
            />
          </div>
        </div>
        <div className={styles.textAreaContainer}>
          <p>{`${commentLimit}/300`}</p>
          <textarea
            value={commentTextContent}
            onChange={(e) => commentInputHandler(e)}
            name="description"
            className={styles.deletePopup__textArea}
            type="text"
            maxLength={300}
            placeholder="Введите комментарий..."
          />
        </div>
        <div className={styles.defaultPhraseFiles}>
          Прикрепите до 4-ех изображений:
        </div>
        <div>
          <label
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragOverHandler}
            onDrop={dropHandler}
            htmlFor="upload_user_message_picture"
            className={
              dragEnter ? styles.uploadLabelActive : styles.uploadLabel
            }
          >
            Загрузить фото
          </label>
          <input
            id="upload_user_message_picture"
            accept="image/png, image/jpeg"
            encType="multipart/form-data"
            onChange={(e) => pictureUploadHandler(e)}
            name="picture"
            className={styles.deletePopup__file}
            type="file"
            multiple={true}
          />
        </div>
        <div className={styles.uploadedPictures}>
          {pictureUrls.map((url, index) => (
            <div className={styles.singlePicture}>
              <img key={index} src={url} alt={`Image ${index}`} />
              <AiFillDelete
                className={styles.removePicture}
                onClick={() => removePictureHandler(index)}
              />
            </div>
          ))}
        </div>
        <IoIosCheckmarkCircle
          onClick={() => {
            commentHandler();

            if (commentTextContent != "" && picture.length <= 4) {
              dispatch(setCreateCommentPopupDisplay("none"));
              setCommentLimit(0);
              setCommentTextContent("");
              setPictureUrls([]);
              setPicture([]);
            }
          }}
          className={styles.submitForm}
        />
      </div>
      <UserActionsInfo />
    </form>
  );
};

export default CreateCommentPopup;
