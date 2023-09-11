import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteSelected, getAllSelected } from "../../http/userApi";
import styles from "./SelectedByUser.module.css";
import { API_URL } from "../../config";
import defaultLogo from "../../assets/Square.png";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { AiOutlineCloseSquare } from "react-icons/ai";

const SelectedByUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const selectedStorage = useSelector((state) => state.app.selected);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isClicked, setIsClicked] = useState(false);
  const userId = currentUser.id;
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    dispatch(getAllSelected(userId));
  }, [userId]);

  useEffect(() => {
    setSelectedItems(selectedStorage);
  }, [selectedStorage]);
  console.log(selectedItems, "Коризнека");
  return (
    isAuth && (
      <div className={styles.selected_dropdown}>
        {isClicked ? (
          <>
            <div
              className={styles.selected_dropdown_header}
              onClick={() => setIsClicked(!isClicked)}
            >
              <p>Избранное</p>
              <BsFillBookmarkHeartFill className={styles.selectedItemsIcon} />
            </div>
            <div className={styles.itemsList}>
              {selectedItems.length > 0 ? (
                selectedItems.map((item) => (
                  <div key={item.id} className={styles.singleItem}>
                    <img
                      onClick={(e) => {
                        console.log(e.target.className);
                        // dispatch(setCurrentDrink(drink.id));
                        navigate(`/drink/${item.drinkId}`, { replace: true });
                      }}
                      className={styles.itemPicture}
                      src={
                        item.picture ? `${API_URL + item.picture}` : defaultLogo
                      }
                    />
                    <div
                      className={styles.itemText}
                      onClick={(e) => {
                        console.log(e.target.className);
                        // dispatch(setCurrentDrink(drink.id));
                        navigate(`/drink/${item.drinkId}`, { replace: true });
                      }}
                    >
                      {item.content}
                    </div>
                    <AiOutlineCloseSquare
                      onClick={() => dispatch(deleteSelected(item.id))}
                      className={styles.itemDelete}
                    />
                  </div>
                ))
              ) : (
                <div className={styles.defaultPhraseSelected}>
                  Пока ничего нет
                </div>
              )}
            </div>
          </>
        ) : (
          <div
            className={styles.defaultContainer}
            onClick={() => setIsClicked(!isClicked)}
          >
            <BsFillBookmarkHeartFill className={styles.selectedItemsIcon} />
          </div>
        )}
      </div>
    )
  );
};

export default SelectedByUser;
