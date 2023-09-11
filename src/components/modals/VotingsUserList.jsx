import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCheckmarkCircle } from "react-icons/io";
import styles from "./votingsUserList.module.css";
import {
  setCreateTagPopupDisplay,
  setUserVotingListDisplay,
} from "../../reducers/appReducer";
import logo from "../../assets/Square.png";
import { createTag } from "../../http/tagApi";
import UserActionsInfo from "../UIsmallComponents/UserActionsInfo";
import { getListOfUsers } from "../../http/votingsApi";
import { API_URL } from "../../config";
const VotingsUserList = ({ idVote }) => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [pageListVoted, setPageListVoted] = useState(1);
  const dispatch = useDispatch();
  const popupDisplay = useSelector((state) => state.app.userVotingList);
  const [userList, setUserList] = useState(null);
  console.log("Привет", idVote);
  useEffect(() => {
    if (idVote) {
      getListOfUsers(idVote, pageListVoted).then((data) => setUserList(data));
    }
  }, [idVote, pageListVoted]);

  function handleScroll(e) {
    const { scrollTop } = e.currentTarget;

    if (scrollTop - lastScrollTop >= 300) {
      console.log("Есть пробитие");
      // здесь вызывается функция для подгрузки следующей порции данных
      setLastScrollTop(scrollTop);
      setPageListVoted((state) => state + 1);
    }
  }

  return (
    <form
      onClick={() => {
        dispatch(setUserVotingListDisplay("none"));
      }}
      className={styles.deletePopup}
      style={{ display: popupDisplay }}
    >
      <div
        className={styles.deletePopup__content}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.popup__Header}>
          <p>Список проголосовавших</p>
          <AiFillCloseCircle
            className={styles.deletePopup__close}
            onClick={() => {
              dispatch(setUserVotingListDisplay("none"));
            }}
          />
        </div>

        <div
          onScroll={(e) => handleScroll(e)}
          className={styles.userListContainer}
        >
          {userList?.length > 0 ? (
            userList?.map((el) => (
              <div className={styles.singleUser}>
                <img
                  src={el.avatar ? `${API_URL}${el.avatar}` : logo}
                  alt="user"
                />
                <p>{el.login}</p>
              </div>
            ))
          ) : (
            <div
              className={styles.defaultPhrase}
            >{`Никто не проголосовал :(`}</div>
          )}
        </div>
      </div>
    </form>
  );
};

export default VotingsUserList;
