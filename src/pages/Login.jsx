import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../http/userApi";
import styles from "./login.module.css";
import { NavLink } from "react-router-dom";
import UserActionsInfo from "../components/UIsmallComponents/UserActionsInfo";
const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  function loginHandler(e) {
    setLogin(e.target.value);
  }
  function passwordHandler(e) {
    setPassword(e.target.value);
  }
  return (
    <div className={styles.authForm}>
      <div className={styles.authForm__header}>Вход в аккаунт</div>
      <input
        value={login}
        onChange={loginHandler}
        type="text"
        placeholder="Введите логин"
      />
      <input
        value={password}
        onChange={passwordHandler}
        type="password"
        placeholder="Введите пароль"
      />
      <div className={styles.regLinkContainer}>
        <div>Нет аккаунта?</div>
        <NavLink to="/registration">Создать аккаунт</NavLink>
      </div>
      <button
        onClick={() => {
          setLogin("");
          setPassword("");
          dispatch(logIn(login, password));
        }}
      >
        Войти
      </button>
      <UserActionsInfo />
    </div>
  );
};

export default Login;
