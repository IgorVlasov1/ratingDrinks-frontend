import React from "react";
import styles from "./commentsDefault.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCreateCommentPopupDisplay } from "../reducers/appReducer";
import { NavLink } from "react-router-dom";
import CreateCommentPopup from "../components/modals/CreateCommentPopup";
const CommentsDefault = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);

  return (
    <div className={styles.defaultContainer}>
      <div className={styles.defaultPhrase}>
        Комментариев пока нет, но ваш может стать первым
      </div>
      {isAuth ? (
        <button
          className={styles.writeCommentButton}
          onClick={() => dispatch(setCreateCommentPopupDisplay("flex"))}
        >
          Написать комментарий
        </button>
      ) : (
        <>
          <div className={styles.notAuthorisedUserPhrase}>
            <NavLink to="/login">Войдите</NavLink> чтобы оставлять комментарии
          </div>
        </>
      )}
      <CreateCommentPopup />
    </div>
  );
};

export default CommentsDefault;
