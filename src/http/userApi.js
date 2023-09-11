import axios from "axios";
import { API_URL } from "../config";
import {
  addSelected,
  deleteFileAction,
  setSelected,
  setUserActionsInfo,
} from "../reducers/appReducer";
import { setUser } from "../reducers/userReducer";
import { addVoting } from "../reducers/votingsReducer";

export const registration = (email, login, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}api/user/registration`, {
        email,
        login,
        password,
      });
      dispatch(setUserActionsInfo(response.data.message, "flex"));
    } catch (e) {
      dispatch(setUserActionsInfo(e.response.data.message, "flex"));
    }
  };
};
export const logIn = (login, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}api/user/login`, {
        login,
        password,
      });
      dispatch(setUserActionsInfo(response.data.message, "flex"));
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      dispatch(setUserActionsInfo(e.response.data.message, "flex"));
    }
  };
};
export const auth = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}api/user/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      alert(e.response.data.message);
      localStorage.removeItem("token");
    }
  };
};
export const uploadAvatar = (file) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(`${API_URL}api/user/avatar`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setUser(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteAvatar = () => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${API_URL}api/user/avatar`,

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      dispatch(setUser(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};
export const createVoting = (
  title,
  votingParams,
  dateEnd,
  file,
  visibility
) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("votingParams", JSON.stringify(votingParams));
      formData.append("dateEnd", dateEnd);
      if (file) {
        formData.append("file", file);
      }
      formData.append("visibility", visibility);
      const response = await axios.post(
        `${API_URL}api/user/admin/createvote`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(setUserActionsInfo(response.data.message, "flex"));
      dispatch(addVoting(response.data.voting));
    } catch (e) {
      dispatch(setUserActionsInfo(e.response.data.message, "flex"));
      console.log(e);
    }
  };
};
export const getTopUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}api/user/topusers`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
export async function getAllDrinksForAdmin() {
  try {
    const response = await axios.get(`${API_URL}api/user/admindrinks`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export function addToSelected(text, picture, drinkId, profileId) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}api/user/selected`,
        {
          text,
          picture,
          drinkId,
          profileId,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(addSelected(response.data.itemSelected));
      dispatch(setUserActionsInfo(response.data.message, "flex"));
    } catch (e) {
      console.log(e);
    }
  };
}
export function getAllSelected(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}api/user/selected/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setSelected(response.data));
    } catch (e) {
      console.log(e);
    }
  };
}
export function deleteSelected(id) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${API_URL}api/user/selected/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(deleteFileAction(id));
    } catch (e) {
      console.log(e);
    }
  };
}
export function changeUserRole(userName, actionType) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}api/user/admin/changerole`,
        { userName, actionType },
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
