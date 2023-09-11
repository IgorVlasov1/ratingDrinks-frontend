import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { API_URL } from "../config";
import logo from "../assets/Square.png";
import { estimateDrink, getOneCard } from "../http/drinksApi";
import styles from "./drinkSingle.module.css";
import { getAllComments } from "../http/commentsApi";
import StarRating from "../components/UIsmallComponents/StarRating";
import UserActionsInfo from "../components/UIsmallComponents/UserActionsInfo";
import { AiOutlineHeart } from "react-icons/ai";
import CommentsSmall from "./CommentsSmall";
import CommentsLarge from "./CommentsLarge";
import ScrollToTop from "../components/UIsmallComponents/ScrollToTop";
import CommentsDefault from "./CommentsDefault";
import { addToSelected } from "../http/userApi";
const DrinkSingle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const createCommentPopup = useSelector(
    (state) => state.app.createCommentPopupDisplay
  );
  const currentUser = useSelector((state) => state.user.currentUser);
  const [drinkParams, setDrinkParams] = useState("");
  const [commentaries, setCommentaries] = useState([]);
  const [previewComments, setPreviewComments] = useState([]);
  const [userLikedComment, setUserLikedComment] = useState(null);
  const [limitForBigCommentaries, setLimitForBigCommentaries] = useState(10);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [userAddingRating, setUserAddingRating] = useState(false);
  const totalCountCommentaries = useSelector(
    (state) => state.app.likedComments
  );
  const userId = currentUser.id;
  const commentStack = useSelector((state) => state.drinks.comments);
  const image = drinkParams.picture ? `${API_URL + drinkParams.picture}` : logo;
  const isAuth = useSelector((state) => state.user.isAuth);
  console.log(commentaries);
  console.log(totalCountCommentaries, "Всего лайки");

  useEffect(() => {
    const handleWheel = (e) => {
      if (createCommentPopup == "flex") {
        e.preventDefault();
      }
    };

    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => document.removeEventListener("wheel", handleWheel);
  }, [createCommentPopup]);
  useEffect(() => {
    setUserLikedComment(totalCountCommentaries);
  }, [totalCountCommentaries]);
  console.log(userLikedComment, "Я слежу за тобой");

  const [commentsForSlider, setCommentsForSlider] = useState([]);
  // useEffect(() => {
  //   setCommentaries((prevCommentaries) => [
  //     ...prevCommentaries,
  //     ...commentStack.filter((comment) => !prevCommentaries.includes(comment)),
  //   ]);
  //   setCommentsForSlider(commentStack);
  // }, [commentStack, userAddingRating]);
  useEffect(() => {
    setCommentaries((prevCommentaries) => [
      ...prevCommentaries,
      ...commentStack.filter(
        (comment) =>
          !prevCommentaries.some((prevComment) => prevComment.id === comment.id)
      ),
    ]);
    setCommentsForSlider(commentStack);
  }, [commentStack, userAddingRating, userLikedComment]);
  useEffect(() => {
    if (limitForBigCommentaries == 10) {
      getOneCard(id).then((data) => {
        setDrinkParams(data);
      });
    }
    // setPreviewComments(commentaries);
  }, [userAddingRating]);

  useEffect(() => {
    if (
      commentaries.length == totalCountCommentaries &&
      commentaries.length > 10
    ) {
      return;
    } else {
      dispatch(getAllComments(id, limitForBigCommentaries, currentPage));
    }
  }, [limitForBigCommentaries, currentPage, userLikedComment]);

  const { ref, inView } = useInView({
    initialInView: false,
    threshold: 0.1,
    delay: 500,
  });

  useEffect(() => {
    if (inView) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
  }, [inView]);

  function onRatingChange(id, voteIndex, userId) {
    if (!isAuth) {
      navigate("/login");
    } else {
      dispatch(estimateDrink(id, voteIndex, userId));
      setUserAddingRating(!userAddingRating);
    }
  }

  return (
    <div>
      <div className={styles.drinkInfoContainer}>
        <div className={styles.bigInfo}>
          {isAuth && (
            <AiOutlineHeart
              className={styles.addToSelected}
              onClick={() =>
                dispatch(
                  addToSelected(
                    drinkParams.title,
                    drinkParams.picture,
                    drinkParams.id,
                    userId
                  )
                )
              }
            />
          )}
          <div className={styles.tagsContainer}>
            {drinkParams?.DrinkTags?.map((el) => (
              <div key={el.tagContent} className={styles.tagSingle}>
                {el.tagContent}
              </div>
            ))}
          </div>
          <div className={styles.titleAndImage}>
            <h1>{drinkParams.title}</h1>
            <img src={image}></img>
            <div className={styles.ratingInfo}>
              <StarRating
                onRatingChange={onRatingChange}
                rating={drinkParams.sumOfVotes / drinkParams.totalVotes}
                id={id}
                userId={userId}
              />
              {drinkParams.totalVotes != 0 ? (
                <>
                  <p>
                    {(drinkParams.sumOfVotes / drinkParams.totalVotes).toFixed(
                      1
                    )}
                  </p>
                  <p className={styles.ratingInfoP}>
                    (Оценили: {drinkParams.totalVotes} )
                  </p>
                </>
              ) : (
                <p className={styles.ratingInfoP}>Оценок пока нет</p>
              )}
            </div>

            <div className={styles.drinkInfoContent}>
              <p className={styles.priceTitle}>Цены в городах:</p>
              <p className={styles.priceTitleScore}>{drinkParams.price}</p>
            </div>
          </div>
        </div>
        <div className={styles.drinkInfoSmall}>
          <div className={styles.drinkInfoDescription}>
            <p>Описание:</p>
            {drinkParams.description}
          </div>
          <div className={styles.detailedInfo}>
            <p>Подробная информация:</p>
            {drinkParams.info &&
              drinkParams.info.map((info) => (
                <div className={styles.otherInfoContainer}>
                  <div className={styles.otherInfoContainerTitle}>
                    {info.name}:
                  </div>
                  <div className={styles.otherInfoContainerDiscr}>
                    {info.content}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div>
        {commentaries.length == 0 ? (
          <CommentsDefault />
        ) : (
          <>
            {buttonVisible && (
              <CommentsSmall commentsForSlider={commentsForSlider} />
            )}
            {!buttonVisible && (
              <>
                <CommentsLarge commentaries={commentaries} />
                {commentaries.length >= 10 && <div ref={ref}></div>}
              </>
            )}

            <button
              className={styles.buttonSeeAll}
              style={buttonVisible ? { display: "block" } : { display: "none" }}
              onClick={() => {
                setButtonVisible(!buttonVisible);
                setLimitForBigCommentaries(10);
              }}
            >
              Показать все комментарии...
            </button>
          </>
        )}
        <ScrollToTop />
      </div>

      <UserActionsInfo />
    </div>
  );
};

export default DrinkSingle;
