import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
// import { GrUserAdmin } from "react-icons/gr";
import { MdAddModerator } from "react-icons/md";
import logo from "../assets/Square.png";
import { API_URL } from "../config";
import { FaVoteYea } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { logout } from "../reducers/userReducer";
import ProfilePopup from "./UIsmallComponents/ProfilePopup";
import { PRIVATE_ROLE } from "../utils/consts";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.user.isAuth);
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <>
      <div className={styles.navbarContainer}>
        <FaVoteYea
          onClick={() => navigate("/vote")}
          className={styles.votePicture}
        />
        <AiOutlineHome
          onClick={() => navigate("/")}
          className={styles.homePicture}
        />
        <div className={styles.publicLinksContainer}>
          <NavLink className={styles.linkS} to="/vote">
            Голосование
          </NavLink>

          <NavLink className={styles.linkS} to="/">
            Главная
          </NavLink>
          {currentUser.role == PRIVATE_ROLE && (
            <NavLink className={styles.linkS} to="/admin">
              Админ
            </NavLink>
          )}
        </div>
        <div className={styles.authContainer}>
          {isAuth && <ProfilePopup />}

          {isAuth && (
            <a className={styles.linkSauth} onClick={() => dispatch(logout())}>
              Выход
            </a>
          )}

          {!isAuth && (
            <NavLink className={styles.linkSauth} to="/login">
              Войти
            </NavLink>
          )}
        </div>
      </div>
      <div>
        <hr className={styles.lineBottom} />
      </div>
    </>
  );
};

export default Navbar;
