import React from "react";
import styles from "./drinkSingle.module.css";
import logo from "../assets/default.svg";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setCreateCommentPopupDisplay } from "../reducers/appReducer";
import CreateCommentPopup from "../components/modals/CreateCommentPopup";
import SingleCommentForLarge from "./SingleCommentForLarge";
const CommentsLarge = ({ commentaries }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const commentariesLengthFull = useSelector(
    (state) => state.app.totalCountCommentaries
  );
  return (
    <div className={styles.comentsContainer}>
      <div className={styles.sendComment}>
        <img src={logo} className={styles.avatarImage} alt="" />

        {isAuth ? (
          <button
            className={styles.writeCommentButton}
            onClick={() => dispatch(setCreateCommentPopupDisplay("flex"))}
          >
            Написать комментарий
          </button>
        ) : (
          <div className={styles.notAuthorisedUserPhrase}>
            <NavLink to="/login">Войдите</NavLink> чтобы оставлять комментарии
          </div>
        )}
      </div>
      <div className={styles.commentsInfo}>
        <p>Комментарииев: {commentariesLengthFull}</p>
      </div>
      <div>
        {commentaries?.map((comm) => (
          <SingleCommentForLarge id={comm.id} comm={comm} />
        ))}
      </div>

      <CreateCommentPopup />
    </div>
  );
};

export default CommentsLarge;
