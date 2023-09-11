import axios from "axios";
import { API_URL } from "../config";
import {
  addComment,
  deleteComment,
  setComments,
} from "../reducers/drinksReducer";
import {
  setTotalCountCommentaries,
  setUserActionsInfo,
} from "../reducers/appReducer";

export function sendComment(formData) {
  try {
    return async (dispatch) => {
      const response = await axios.post(
        `${API_URL}api/comments/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (
        !response.data.pictures.includes(",") &&
        response.data.pictures.length > 1
      ) {
        let arrForPicture = [];
        response.data.pictures = [...arrForPicture, response.data.pictures];
      }
      if (response.data.pictures.includes(",")) {
        response.data.pictures = response.data.pictures.split(",");
      }
      console.log(response.data);
      dispatch(addComment(response.data));
    };
  } catch (e) {
    console.log(e);
  }
}
export function getAllComments(id, limit, page) {
  try {
    return async (dispatch) => {
      const response = await axios.get(
        `${API_URL}api/comments/${id}&${limit}&${page}`
      );

      console.log(response.data, "Это оно");

      dispatch(setComments(response.data.rows));
      dispatch(setTotalCountCommentaries(response.data.count));
    };
  } catch (e) {
    console.log(e);
  }
}
export function deleteSingleComment(commId) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${API_URL}api/comments?id=${commId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(deleteComment(commId));
      dispatch(setUserActionsInfo(response.data.message, "flex"));
    } catch (e) {
      dispatch(setUserActionsInfo(e.response.data.message, "flex"));
    }
  };
}

export async function estimateComment(commentId, userId, rating) {
  try {
    const response = await axios.post(
      `${API_URL}api/comments/estimate`,
      {
        commentId,
        userId,
        rating,
      },

      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
  } catch (e) {
    console.log(e);
  }
}
