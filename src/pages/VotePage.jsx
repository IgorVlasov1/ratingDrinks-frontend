import React, { useEffect, useState } from "react";

import styles from "./VotePage.module.css";
import { dateTransform } from "../utils/dateTransform";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import {
  getVotings,
  setVote,
  changeStatusVoting,
  changeStatusVotingManually,
  deleteOneVoting,
} from "../http/votingsApi";
import { FaRegCalendarTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { TfiCup } from "react-icons/tfi";
import { dateCompare } from "../utils/dateCompare";
import { getTopUsers } from "../http/userApi";
import { API_URL } from "../config";
import { BsFillPeopleFill } from "react-icons/bs";
import logo from "../assets/default.svg";
import { setUserVotingListDisplay } from "../reducers/appReducer";
import { AiFillDelete } from "react-icons/ai";
import VotingsUserList from "../components/modals/VotingsUserList";
import PublicChat from "../components/PublicChat";
import Tooltip from "../components/UIsmallComponents/Tooltip";
import { PRIVATE_ROLE } from "../utils/consts";
const VotePage = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const votes = useSelector((state) => state.votes.votings);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [nameSort, setNameSort] = useState("");
  const [votesInfo, setVotesInfo] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [isVoted, setIsVoted] = useState(false);
  const [listOfTopUsers, setListOfTopUsers] = useState([]);
  const [showLeftItems, setShowLeftItems] = useState(true);
  console.log(listOfTopUsers);
  const [showLeftItemsEnded, setShowLeftItemsEnded] = useState(true);
  console.log("ГОЛОСОВАНИЯ", votesInfo);
  useEffect(() => {
    dispatch(getVotings());
  }, [dispatch, setVotesInfo, selectedName, isVoted, nameSort]);
  useEffect(() => {
    setVotesInfo(votes);
  }, [votes, selectedItem, selectedName, isVoted]);

  useEffect(() => {
    setSelectedItem(votesInfo.find((item) => item.title === nameSort));
  }, [
    nameSort,
    votesInfo,
    selectedItem,
    selectedName,
    setIsVoted,
    setVotesInfo,
  ]);
  useEffect(() => {
    getTopUsers().then((data) => setListOfTopUsers(data));
  }, [selectedName]);
  function showUserListHandler() {
    dispatch(setUserVotingListDisplay("flex"));
  }

  const backgroundImage = selectedItem?.picture
    ? `${API_URL + selectedItem?.picture} `
    : "";
  return (
    <div className={styles.votingPageContainer}>
      <div className={styles.votingLeftAndRightPanels}>
        <div className={styles.votingLeftPanel}>
          <div
            className={styles.listTitle}
            onClick={() => setShowLeftItems(!showLeftItems)}
            // className={styles.leftPanelItemSortTitleFirst}
          >
            Активные голосования
            {showLeftItems ? <VscTriangleDown /> : <VscTriangleUp />}
          </div>
          <div
            className={
              showLeftItems
                ? styles.activeVotingsContainer
                : styles.activeVotingsContainerHidden
            }
          >
            {votesInfo?.map(
              (voting) =>
                voting.status && (
                  <div
                    onClick={(e) => {
                      setIsVoted(false);
                      setNameSort(e.target.closest("div").innerHTML);
                    }}
                    className={styles.leftPanelTitleItem}
                  >
                    {voting.title}
                  </div>
                )
            )}
          </div>
          <div
            className={styles.listTitle}
            onClick={() => setShowLeftItemsEnded(!showLeftItemsEnded)}
          >
            Завершенные голосования
            {showLeftItemsEnded ? <VscTriangleDown /> : <VscTriangleUp />}
          </div>
          <div
            className={
              showLeftItemsEnded
                ? styles.endedVotingsContainer
                : styles.endedVotingsContainerHidden
            }
          >
            {votesInfo?.map(
              (voting) =>
                !voting.status && (
                  <div
                    onClick={(e) => {
                      setIsVoted(false);
                      setNameSort(e.target.closest("div").innerHTML);
                    }}
                    className={styles.leftPanelTitleItem}
                  >
                    {voting.title}
                  </div>
                )
            )}
          </div>
        </div>
        <div className={styles.centerPageContainer}>
          <div className={styles.topVotes}>
            <h2>Самые активные пользователи</h2>
            <div className={styles.topUsersContainer}>
              {listOfTopUsers[1] && (
                <div className={styles.singleUserContainerSecond}>
                  <div className={styles.singleUserContainerPrize}></div>
                  <img
                    src={
                      //listOfTopUsers[1].avatar
                      //? `${API_URL + listOfTopUsers[1].avatar}`
                      //:
                      logo
                    }
                    alt="first"
                  />
                  <div>{listOfTopUsers[1]?.login}</div>
                  <div>Голосов: {listOfTopUsers[1]?.totalVotes}</div>
                </div>
              )}
              {listOfTopUsers[0] && (
                <div className={styles.singleUserContainerFirst}>
                  <div className={styles.singleUserContainerPrize}></div>
                  <img
                    src={
                      // listOfTopUsers[0].avatar
                      // ? `${API_URL + listOfTopUsers[0].avatar}`
                      // :
                      logo
                    }
                    alt="first"
                  />
                  <div>{listOfTopUsers[0]?.login}</div>
                  <div>Голосов: {listOfTopUsers[0]?.totalVotes}</div>
                </div>
              )}
              {listOfTopUsers[2] && (
                <div className={styles.singleUserContainerThird}>
                  <div className={styles.singleUserContainerPrize}></div>
                  <img
                    src={
                      // listOfTopUsers[2].avatar
                      // ? `${API_URL + listOfTopUsers[2].avatar}`
                      // :
                      logo
                    }
                    alt="first"
                  />
                  <div>{listOfTopUsers[2]?.login}</div>
                  <div>Голосов: {listOfTopUsers[2]?.totalVotes}</div>
                </div>
              )}
            </div>
          </div>
          {nameSort === "" ? (
            <div className={styles.defaultPhrase}>
              <p>Выберите активное голосование, чтобы принять участие</p>
            </div>
          ) : (
            <form className={styles.formForVoting}>
              <div
                className={styles.currentVotingActive}
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(255,255,255, 0.25) 0 100%), url(${backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <div className={styles.activeVotingHeader}>
                  {selectedItem?.visibility == "open" && (
                    <BsFillPeopleFill onClick={showUserListHandler} />
                  )}
                  {currentUser.role == PRIVATE_ROLE && (
                    <>
                      <FaRegCalendarTimes
                        onClick={() =>
                          dispatch(changeStatusVotingManually(selectedItem.id))
                        }
                      />
                      <AiFillDelete
                        onClick={() =>
                          dispatch(deleteOneVoting(selectedItem.id))
                        }
                      />
                    </>
                  )}
                </div>

                <h2>{selectedItem?.title}</h2>

                {selectedItem?.usersWhoVote?.includes(currentUser.id) ||
                selectedItem?.status == false ||
                isVoted ? (
                  selectedItem?.votingContent?.map((candidate) => (
                    <div
                      key={candidate.name}
                      className={styles.alreadyVotedContainer}
                    >
                      <div className={styles.votedElementHeader}>
                        <div className={styles.votedElementHeaderTitle}>
                          {candidate.name}
                        </div>
                        <div className={styles.votedElementHeaderVotes}>
                          {candidate.votes}
                        </div>
                      </div>
                      <div className={styles.wrapper}>
                        <div className={styles.progressBar}>
                          <span
                            className={styles.progressBarFill}
                            style={
                              candidate.votes > 0
                                ? {
                                    width: ` ${
                                      (candidate.votes /
                                        selectedItem.totalVotes) *
                                      100
                                    }% `,
                                  }
                                : { width: 0 + "%" }
                            }
                          >
                            {candidate.votes > 0
                              ? `${Math.floor(
                                  (candidate.votes / selectedItem.totalVotes) *
                                    100
                                )}
                        %`
                              : "0%"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.candidateVotingContainer}>
                    {selectedItem?.votingContent?.map((candidate) => {
                      const activeQ = candidate.name === selectedName;
                      const className = activeQ
                        ? styles.candidateActive
                        : styles.candidateInactive;

                      return (
                        <div
                          key={candidate.name}
                          className={`${className}`}
                          onClick={() => setSelectedName(candidate.name)}
                        >
                          <div className={styles.titleAndNumVotes}>
                            <span className={styles.voteName}>
                              {candidate.name}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    {isAuth ? (
                      <button
                        className={styles.voteButton}
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(
                            setVote(
                              selectedItem.id,
                              selectedName,
                              currentUser.id
                            )
                          );
                          setTimeout(() => setIsVoted(true), 800);
                        }}
                        disabled={!selectedName}
                      >
                        Проголосовать
                      </button>
                    ) : (
                      <Tooltip text="Авторизуйтесь, чтобы проголосовать">
                        <button
                          className={styles.voteButton}
                          disabled={!selectedName}
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          Проголосовать
                        </button>
                      </Tooltip>
                    )}
                  </div>
                )}
                <div className={styles.voteNum}>
                  {}
                  <div>Проголосовали: {selectedItem?.totalVotes}</div>
                </div>

                <div className={styles.dateEnd}>
                  {selectedItem?.status == false
                    ? "Голосование завершено"
                    : `Голосование кончится в ${dateTransform(
                        selectedItem?.dateEnd
                      )}`}
                  <p>
                    {selectedItem?.visibility == "anon"
                      ? "Aнонимное голосование"
                      : "Открытое голосование"}
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
        <VotingsUserList idVote={selectedItem?.id} />
        <PublicChat />
      </div>
    </div>
  );
};

export default VotePage;
