import axios from "axios";
import { API_URL } from "../config";
import {
  hideLoader,
  setTotalCount,
  setUserActionsInfo,
  showLoader,
} from "../reducers/appReducer";
import { addFile, setFiles, deleteFile } from "../reducers/drinksReducer";

export function createDrinkCard(params, file, otherInfo, tagContentArray) {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("params", JSON.stringify(params));
      formData.append("otherInfo", JSON.stringify(otherInfo));
      formData.append("tagContentArray", JSON.stringify(tagContentArray));
      const response = await axios.post(
        `${API_URL}api/drinks/create`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(setUserActionsInfo(response.data.message, "flex"));
      dispatch(addFile(response.data));
    } catch (e) {
      dispatch(setUserActionsInfo(e.response.data.message, "flex"));
    }
  };
}
export function getAllCards(selectedOptions, search, page, limit) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      let url = `${API_URL}api/drinks`;
      let tagNames;
      if (selectedOptions && selectedOptions.length > 0) {
        tagNames = selectedOptions.map((option) => option.label).join(",");
        url = `${API_URL}api/drinks?tags=${tagNames}`;
      }
      if (search) {
        url = `${API_URL}api/drinks?search=${search}`;
      }
      if (selectedOptions && selectedOptions.length > 0 && search) {
        tagNames = selectedOptions.map((option) => option.label).join(",");
        url = `${API_URL}api/drinks?tags=${tagNames}&search=${search}`;
      }
      const response = await axios.get(url, {
        params: {
          page,
          limit,
        },
      });

      if (search) {
        dispatch(setTotalCount(response.data.rows.length));
      } else {
        dispatch(setTotalCount(response.data.count));
      }

      dispatch(setFiles(response.data.rows));
    } catch (e) {
      console.log(e.response?.data.message);
    } finally {
      dispatch(hideLoader());
    }
  };
}

export async function getOneCard(id) {
  try {
    const response = await axios.get(`${API_URL}api/drinks/${id}`);
    return response.data;
  } catch (e) {
    alert(e.response.data.message);
  }
}

export function deleteCard(id) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${API_URL}api/drinks?id=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(deleteFile(id));
      dispatch(setUserActionsInfo(response.data.message, "flex"));
    } catch (e) {
      dispatch(setUserActionsInfo(e.response.data.message, "flex"));
    }
  };
}

export function estimateDrink(id, vote, userId) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}api/drinks/estimate/${id}`,
        {
          vote,
          userId,
        },
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

export function searchDrinks(search) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_URL}api/drinks/search?search=${search}`
      );
      console.log(response.data.rows.length, "ДЛИНА");
      dispatch(setTotalCount(response.data.rows.length));
      dispatch(setFiles(response.data.rows));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}
