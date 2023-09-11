import React, { useState, useEffect } from "react";
import styles from "./commentsSmall.module.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import logo from "../assets/default.svg";
import { API_URL } from "../config";
import "./smallStyleForSlider.css";
import { dateTransform } from "../utils/dateTransform";
import PhotoViewer from "../components/UIsmallComponents/PhotoViewer";
const CommentsSmall = ({ commentsForSlider }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setSlidesToShow(5);
      } else if (window.innerWidth >= 992) {
        setSlidesToShow(4);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (
      currentSlide >=
      Math.floor(commentsForSlider.length / slidesToShow) - 1
    ) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }

    document.querySelector(`.${styles.slide}`).classList.add("slide-animation");
    setTimeout(() => {
      document
        .querySelector(`.${styles.slide}`)
        .classList.remove("slide-animation");
    }, 500);
  };

  const prevSlide = () => {
    if (currentSlide == 0) {
      setCurrentSlide(2);
    } else {
      setCurrentSlide(currentSlide - 1);
    }

    document.querySelector(`.${styles.slide}`).classList.add("slide-animation");
    setTimeout(() => {
      document
        .querySelector(`.${styles.slide}`)
        .classList.remove("slide-animation");
    }, 500);
  };

  const [showPhotoViewer, setShowPhotoViewer] = useState(false);

  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const handleThumbnailClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setShowPhotoViewer(true);
  };

  const handleClosePhotoViewer = () => {
    setShowPhotoViewer(false);
    setSelectedImageUrl("");
  };

  const renderComments = () => {
    const startIndex = currentSlide * slidesToShow;
    const endIndex = startIndex + slidesToShow;
    return commentsForSlider
      .slice(startIndex, endIndex)
      .map((comment, index) => (
        <div key={index} className={styles.singleComment}>
          <div className={styles.singleCommentHeader}>
            <img
              className={styles.avatarImage}
              src={
                comment.authorPicture
                  ? `${API_URL + comment.authorPicture}`
                  : logo
              }
            />
            <p>{comment.authorName}</p>
            <p className={styles.dateCreatedAt}>
              {dateTransform(comment.createdAt)}
            </p>
            <p
              className={
                comment.likeStat > 0
                  ? styles.userScorePositive
                  : styles.userScoreNegative
              }
            >
              {comment.likeStat > 0 ? `+${comment.likeStat}` : comment.likeStat}
            </p>
          </div>
          <div className={styles.commentContent}>
            <p>{comment.content}</p>
          </div>
          {comment.pictures[0] && comment.pictures !== "" && (
            <div className={styles.commentPictureBlock}>
              {comment?.pictures?.map((picture) => (
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
      ));
  };

  return (
    <div className={styles.comments_small}>
      <div className={styles.slider}>
        <div className={styles.slide}>{renderComments()}</div>
      </div>
      {commentsForSlider.length >= 3 && (
        <>
          <AiOutlineArrowLeft
            className={styles.arrowLeft}
            disabled={currentSlide === 0}
            onClick={prevSlide}
          />

          <AiOutlineArrowRight
            className={styles.arrowRight}
            disabled={
              currentSlide ===
              Math.floor(commentsForSlider.length / slidesToShow)
            }
            onClick={nextSlide}
          />
        </>
      )}
      {showPhotoViewer && (
        <PhotoViewer
          imageUrl={selectedImageUrl}
          onClose={handleClosePhotoViewer}
        />
      )}
    </div>
  );
};
export default CommentsSmall;
