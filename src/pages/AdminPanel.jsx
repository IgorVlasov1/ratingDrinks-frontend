import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CreateDrink from "../components/modals/CreateDrink";
import styles from "./adminPanel.module.css";

import {
  setCreateDrinkPopupDisplay,
  setCreateTagPopupDisplay,
  setCreateVotingPopupDisplay,
} from "../reducers/appReducer";
import CreateVoting from "../components/modals/CreateVoting";
import CreateTag from "../components/modals/CreateTag";
import UserActionsInfo from "../components/UIsmallComponents/UserActionsInfo";
import { changeUserRole } from "../http/userApi";
const AdminPanel = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [actionType, setActionType] = useState("addRole");

  function showCreateDrinkPopupHandler() {
    dispatch(setCreateDrinkPopupDisplay("flex"));
  }
  function showCreateVotePopuHandler() {
    dispatch(setCreateVotingPopupDisplay("flex"));
  }
  function showTagVotePopuHandler() {
    dispatch(setCreateTagPopupDisplay("flex"));
  }
  function changeRoleHandler() {
    dispatch(changeUserRole(userName, actionType));
  }
  return (
    <div className={styles.adminButtons}>
      <button
        className={styles.adminButton}
        onClick={showCreateDrinkPopupHandler}
      >
        Создать новый напиток
      </button>
      <button
        className={styles.adminButton}
        onClick={showCreateVotePopuHandler}
      >
        Создать голосование
      </button>
      <button className={styles.adminButton} onClick={showTagVotePopuHandler}>
        Добавить теги
      </button>
      <CreateDrink />
      <CreateVoting />
      <CreateTag />
      <UserActionsInfo />
      <div className={styles.changeRoleContainer}>
        <p>Назначить/удалить роль</p>
        <div className={styles.inputsContainer}>
          <div>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Логин пользователя..."
            />
            <select onChange={(e) => setActionType(e.target.value)}>
              <option key="1" value="addRole" selected>
                Назначить
              </option>
              <option key="2" value="deleteRole">
                Удалить
              </option>
            </select>
          </div>
          <button onClick={changeRoleHandler}>Выполнить</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
