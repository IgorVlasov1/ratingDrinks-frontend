import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadAvatar, deleteAvatar } from "../../http/userApi";
import { NavLink, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import { PRIVATE_ROLE } from "../../utils/consts";
import "./profile.css";
import logo from "../../assets/default.svg";
function ProfilePopup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : logo;
  const [isOpen, setIsOpen] = useState(false);
  console.log(currentUser);
  function handleClick() {
    setIsOpen(!isOpen);
  }
  function changeHandler(e) {
    const file = e.target.files[0];
    dispatch(uploadAvatar(file));
  }
  function deleteAvatarHandler() {
    if (avatar !== logo) {
      dispatch(deleteAvatar());
    }
  }
  return (
    <div className="profile-popup">
      <img
        className="profile-popup_avatar"
        src={avatar}
        alt="Profile"
        onClick={handleClick}
      />
      {isOpen && (
        <div className="popup-content">
          <p>
            Аватар и логин будут видны в комментариях и на странице голосований
          </p>
          <h2>логин: {currentUser.login}</h2>
          <p> почта: {currentUser.email}</p>
          <img
            className="profile-popup_avatar_big"
            src={
              // avatar
              logo
            }
            alt=""
          />
          <div className="user__profile__change__avatar">
            <button>
              <label for="user__profle__uploadAvatar">Сменить</label>
            </button>
            <button onClick={deleteAvatarHandler}>Удалить</button>
            <input
              id="user__profle__uploadAvatar"
              className="user__profle__uploadAvatar"
              accept="image/*"
              onChange={(e) => changeHandler(e)}
              type="file"
              placeholder="Загрузить аватар"
            />
          </div>
          {currentUser.role == PRIVATE_ROLE && (
            <NavLink to={"/admin"} className="adminPanel">
              Админ панель
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfilePopup;
