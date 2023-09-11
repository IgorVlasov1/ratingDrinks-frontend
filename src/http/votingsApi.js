import axios from "axios";
import { API_URL } from "../config";
import { setUser } from "../reducers/userReducer";
import {
  addMessage,
  deleteVoting,
  setMessages,
  setVotings,
} from "../reducers/votingsReducer";
import { setUserActionsInfo } from "../reducers/appReducer";

export function getVotings(name) {
  return async (dispatch) => {
    try {
      let url = `${API_URL}api/votings`;
      if (name) {
        url = `${API_URL}api/votings?name=${name}`;
      }

      let response = await axios.get(url);
      dispatch(setVotings(response.data));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}
export function setVote(votingId, candidateName, userId) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}api/votings/vote`,
        { votingId, candidateName, userId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(setUserActionsInfo(response.data.message, "flex"));
    } catch (e) {
      dispatch(setUserActionsInfo(e.response.data.message, "flex"));
    }
  };
}

export function changeStatusVotingManually(voteId) {
  return async (dispatch) => {
    try {
      console.log(voteId, "Меняю статус");
      const response = await axios.post(
        `${API_URL}api/votings/manualchange`,
        { voteId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(setUserActionsInfo(response.data.message, "flex"));
    } catch (e) {
      console.log(e);
    }
  };
}
export async function getListOfUsers(voteId, page) {
  try {
    const response = await axios.get(
      `${API_URL}api/votings/singlevote/${voteId}`,
      {
        params: {
          page,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (e) {
    alert(e.response.data.message);
  }
}
export function sendMessageInPublicChat(name, avatar, message) {
  return async (dispatch) => {
    try {
      console.log(avatar);
      const response = await axios.post(
        `${API_URL}api/votings/sendchatmessage`,
        {
          name,
          avatar,
          message,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data, "Сообщение");
      dispatch(addMessage(response.data));
    } catch (e) {
      console.log(e);
    }
  };
}
export function getAllMessagesFromPublicChat() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}api/votings/publicchat`);

      dispatch(setMessages(response.data));
    } catch (e) {
      console.log(e);
    }
  };
}
export function deleteOneVoting(id) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${API_URL}api/votings?id=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(deleteVoting(id));
      dispatch(setUserActionsInfo(response.data.message, "flex"));
    } catch (e) {
      console.log(e);
    }
  };
}
