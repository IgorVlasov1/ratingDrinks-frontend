import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setUserActionsInfo } from "../../reducers/appReducer";
import "./UserActionsInfo.css";
const UserActionsInfo = () => {
  const dispatch = useDispatch();
  const infoToShow = useSelector((state) => state.app.userActionsInfo);
  const [infoDA, setInfoDa] = useState(infoToShow);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setInfoDa(infoToShow);
  }, [infoToShow]);
  useEffect(() => {
    let timeout;
    if (progress > 0) {
      timeout = setTimeout(() => {
        dispatch(setUserActionsInfo("", "none"));
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [infoToShow]);

  useEffect(() => {
    let interval;
    if (infoDA[2] == "") {
      return;
    } else {
      interval = setInterval(() => {
        setProgress((prevProgress) => prevProgress + 2);
      }, 100);
    }

    return () => {
      clearInterval(interval);
      setProgress(0);
    };
  }, [infoToShow]);
  return (
    <div
      className={
        infoDA[1] == "flex"
          ? "fileaction__container"
          : "fileaction__container__disabled"
      }
    >
      <div className="fileActionsInfo">
        <p>{infoDA[0]}</p>
        <AiFillCloseCircle
          className="fileaction__button__close"
          onClick={() => setInfoDa("", "none")}
        />
      </div>
      <progress
        className="fileaction__progress__bar"
        id="progressbar"
        max="100"
        value={progress}
      />
    </div>
  );
};

export default UserActionsInfo;
