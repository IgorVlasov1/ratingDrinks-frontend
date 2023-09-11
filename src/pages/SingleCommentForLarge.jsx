import React, { useEffect } from "react";
import { useState } from "react";
import { dateTransform } from "../utils/dateTransform";
import { estimateComment } from "../http/commentsApi";
import { JsonTransform } from "../utils/jsonTransform";
import { addLikedComments } from "../reducers/appReducer";
import { API_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLike, AiOutlineDislike, AiFillDelete } from "react-icons/ai";
import { deleteSingleComment } from "../http/commentsApi";
import PhotoViewer from "../components/UIsmallComponents/PhotoViewer";
import styles from "./drinkSingle.module.css";

import logo from "../assets/Square.png";
import Tooltip from "../components/UIsmallComponents/Tooltip";
import { PRIVATE_ROLE } from "../utils/consts";
const SingleCommentForLarge = ({ comm }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = currentUser.id;
  const handleThumbnailClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setShowPhotoViewer(true);
  };
  console.log("ЭТО КОММЕНТАРИЙ", comm);
  const [showPhotoViewer, setShowPhotoViewer] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [currentClassForLikeButton, setCurrentClassForLikeButton] =
    useState("");
  const [currentClassForDislikeButton, setCurrentClassForDislikeButton] =
    useState("");
  const [showHint, setShowHint] = useState(false);
  const isAuth = useSelector((state) => state.user.isAuth);
  const [commentDeleted, setCommentDeleted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likeStat, setLikeStat] = useState(comm.likeStat);
  const [prevEstimation, setPrevEstimation] = useState(
    JsonTransform(comm.usersWhoVote, userId)
  );
  const handleClosePhotoViewer = () => {
    setShowPhotoViewer(false);
    setSelectedImageUrl("");
  };

  useEffect(() => {
    if (JsonTransform(comm.usersWhoVote, userId) == "like") {
      setCurrentClassForLikeButton(styles.likeButtonActive);
    } else {
      setCurrentClassForLikeButton(styles.likeButton);
    }
    if (JsonTransform(comm.usersWhoVote, userId) == "dislike") {
      setCurrentClassForDislikeButton(styles.dislikeButtonActive);
    } else {
      setCurrentClassForDislikeButton(styles.dislikeButton);
    }
  }, []);
  useEffect(() => {
    if (isLiked) {
      if (currentClassForLikeButton !== styles.likeButtonActive) {
        setCurrentClassForLikeButton(styles.likeButtonActive);
        setCurrentClassForDislikeButton(styles.dislikeButton);
      }
    }
    if (isDisliked) {
      if (currentClassForDislikeButton !== styles.dislikeButtonActive) {
        setCurrentClassForLikeButton(styles.likeButton);
        setCurrentClassForDislikeButton(styles.dislikeButtonActive);
      }
    }
    if (
      !isDisliked &&
      !isLiked &&
      currentClassForDislikeButton == styles.dislikeButtonActive
    ) {
      setCurrentClassForDislikeButton(styles.dislikeButton);
    }
    if (
      !isDisliked &&
      !isLiked &&
      currentClassForLikeButton == styles.likeButtonActive
    ) {
      setCurrentClassForLikeButton(styles.likeButton);
    }
  }, [isLiked, isDisliked]);

  return (
    <>
      {commentDeleted ? (
        <>
          <div key={comm.id} className={styles.answersContainerDeleted}>
            <div className={styles.headerComment}>
              <img
                className={styles.avatarImage}
                src={
                  comm.authorPicture ? `${API_URL + comm.authorPicture}` : logo
                }
              />
              <div>{comm.authorName}</div>
              <div className={styles.dateComment}>
                {dateTransform(comm.createdAt)}
              </div>
              <div className={styles.commentStatContainer}></div>
            </div>
            <div className={styles.contentComment}>
              Комментарий удален модератором
            </div>
          </div>
        </>
      ) : (
        <div key={comm.id} className={styles.answersContainer}>
          <div className={styles.headerComment}>
            <img
              className={styles.avatarImage}
              src={
                comm.authorPicture ? `${API_URL + comm.authorPicture}` : logo
              }
            />
            <div className={styles.authorTitle}>{comm.authorName}</div>
            <div className={styles.dateComment}>
              {dateTransform(comm.createdAt)}
            </div>
            <div className={styles.commentStatContainer}>
              {isAuth ? (
                <>
                  <AiOutlineLike
                    className={currentClassForLikeButton}
                    onClick={() => {
                      const newEstimation = "like";
                      if (prevEstimation === newEstimation) {
                        estimateComment(comm.id, userId, "like");
                        dispatch(addLikedComments(-1));
                        setLikeStat((prev) => prev - 1);
                        setPrevEstimation(null);
                      } else if (prevEstimation === "dislike") {
                        estimateComment(comm.id, userId, newEstimation);
                        dispatch(addLikedComments(2));
                        setLikeStat((prev) => prev + 2);
                        setPrevEstimation(newEstimation);
                      } else {
                        estimateComment(comm.id, userId, newEstimation);
                        dispatch(addLikedComments(1));
                        setLikeStat((prev) => prev + 1);
                        setPrevEstimation(newEstimation);
                      }
                      setIsLiked(!isLiked);
                      setIsDisliked(false);
                    }}
                  />
                  <span className={styles.statNum}>{likeStat}</span>
                  <AiOutlineDislike
                    className={currentClassForDislikeButton}
                    onClick={() => {
                      const newEstimation = "dislike";
                      if (prevEstimation === newEstimation) {
                        estimateComment(comm.id, userId, "dislike");
                        dispatch(addLikedComments(1));
                        setLikeStat((prev) => prev + 1);
                        setPrevEstimation(null);
                      } else if (prevEstimation === "like") {
                        estimateComment(comm.id, userId, newEstimation);
                        dispatch(addLikedComments(-2));
                        setLikeStat((prev) => prev - 2);
                        setPrevEstimation(newEstimation);
                      } else {
                        estimateComment(comm.id, userId, newEstimation);
                        dispatch(addLikedComments(-1));
                        setLikeStat((prev) => prev - 1);
                        setPrevEstimation(newEstimation);
                      }
                      setIsLiked(false);
                      setIsDisliked(!isDisliked);
                    }}
                  />
                </>
              ) : (
                <>
                  <Tooltip text="Авторизуйтесь, чтобы ставить оценку">
                    <AiOutlineLike />
                  </Tooltip>
                  <span className={styles.statNum}>{likeStat}</span>
                  <Tooltip text="Авторизуйтесь, чтобы ставить оценку">
                    <AiOutlineDislike />
                  </Tooltip>
                </>
              )}
            </div>

            {(currentUser.id == comm.ProfileId ||
              currentUser.role == PRIVATE_ROLE) && (
              <AiFillDelete
                className={styles.deleteComm}
                onClick={() => {
                  dispatch(deleteSingleComment(comm.id));
                  setCommentDeleted(true);
                }}
              />
            )}
          </div>
          <div className={styles.contentComment}>{comm.content}</div>
          {comm.pictures[0] && comm.pictures !== "" && (
            <div className={styles.commentPictureBlock}>
              {comm?.pictures?.map((picture) => (
                <img
                  key={picture}
                  onClick={() => handleThumbnailClick(`${API_URL + picture}`)}
                  className={styles.singlePicture}
                  src={`${API_URL + picture}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {showPhotoViewer && (
        <PhotoViewer
          imageUrl={selectedImageUrl}
          onClose={handleClosePhotoViewer}
        />
      )}
    </>
  );
};

export default SingleCommentForLarge;
