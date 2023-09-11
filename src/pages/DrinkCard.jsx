import React from "react";
import logo from "../assets/Square.png";
import styles from "./drinksCard.module.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import StarRating from "../components/UIsmallComponents/StarRating";
import { deleteCard } from "../http/drinksApi";
import { PRIVATE_ROLE } from "../utils/consts";
const DrinkCard = ({ drink }) => {
  let disabled = true;
  const dispatch = useDispatch();
  console.log(drink.totalVotes);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  // console.log(drink.picture);
  const image = drink.picture ? `${API_URL + drink.picture}` : logo;
  console.log(drink);
  return (
    <div className={styles.drinkContainer}>
      {currentUser.role == PRIVATE_ROLE && (
        <AiFillDelete
          className={styles.deleteCard}
          onClick={() => dispatch(deleteCard(drink.id))}
        />
      )}
      <div
        onClick={(e) => {
          console.log(e.target.className);
          // dispatch(setCurrentDrink(drink.id));
          navigate(`/drink/${drink.id}`, { replace: true });
        }}
      >
        <img loading="lazy" src={image} alt="valuea"></img>
        <div className={styles.drinkName}>{drink.title}</div>
        <div className={styles.drinkPrice}>Стоимость: {drink.price}</div>
        <div className={styles.starAndStats}>
          <StarRating
            disabled={disabled}
            rating={drink.sumOfVotes / drink.totalVotes}
          />
          <p>{drink.totalVotes}</p>
        </div>
      </div>
    </div>
  );
};

export default DrinkCard;
