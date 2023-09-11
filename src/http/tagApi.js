import axios from "axios";
// import { json } from "react-router-dom";
import { API_URL } from "../config";
import {
  hideLoader,
  setUserActionsInfo,
  showLoader,
} from "../reducers/appReducer";
import { addTag, setTags } from "../reducers/drinksReducer";

export const createTag = (tagContent) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}api/user/admin/createtag`,
        { tagContent },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(setUserActionsInfo(response.data.message, "flex"));
      dispatch(addTag(response.data));
    } catch (e) {
      dispatch(setUserActionsInfo(e.response.data.message, "flex"));
      console.log(e);
    }
  };
};
export function getAllTags() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}api/user/tags`);
      console.log(response.data);
      dispatch(setTags(response.data));
    } catch (e) {
      console.log(e);
    }
  };
}
