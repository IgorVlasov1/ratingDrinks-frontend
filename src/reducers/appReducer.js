const SET_CREATE_DRINK_POPUP_DISPLAY = "SET_CREATE_DRINK_POPUP_DISPLAY";
const SET_CREATE_VOTING_POPUP_DISPLAY = "SET_CREATE_VOTING_POPUP_DISPLAY";
const SET_CREATE_TAG_POPUP_DISPLAY = "SET_CREATE_TAG_POPUP_DISPLAY";
const SET_CREATE_COMMENT_POPUP_DISPLAY = "SET_CREATE_COMMENT_POPUP_DISPLAY";
const SET_USER_VOTING_LIST = "SET_USER_VOTING_LIST";
const SET_PAGE = "SET_PAGE";
const TOTAL_COUNT_DRINKS = "TOTAL_COUNT_DRINKS";
const TOTAL_COUNT_COMMENTARIES = "TOTAL_COUNT_COMMENTARIES";
const SET_PAGE_LIMIT = "SET_PAGE_LIMIT";
const SEARCH_STRING_VALUE = "SEARCH_STRING_VALUE";
const SET_PARAMS_TO_USER_ACTIONS_INFO = "SET_PARAMS_TO_USER_ACTIONS_INFO";
const ADD_LIKED_COMMENTS = "ADD_LIKED_COMMENTS";
const SET_SELECTED = "SET_SELECTED";
const ADD_SELECTED = "ADD_SELECTED";
const DELETE_SELECTED = "DELETE_SELECTED";
const SHOW_LOADER = "SHOW_LOADER";
const HIDE_LOADER = "HIDE_LOADER";
const defaultState = {
  creatDrinkPopupDisplay: "none",
  creatVotingPopupDisplay: "none",
  createTagPopupDisplay: "none",
  createCommentPopupDisplay: "none",
  userVotingList: "none",
  userActionsInfo: "none",
  page: 1,
  totalCount: 0,
  limit: 5,
  searchString: "",
  totalCountCommentaries: null,
  likedComments: 0,
  selected: [],
  loader: false,
};
export default function appReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_PAGE:
      return { ...state, page: action.payload };
    case SHOW_LOADER:
      return { ...state, loader: true };
    case HIDE_LOADER:
      return { ...state, loader: false };
    case TOTAL_COUNT_DRINKS:
      return { ...state, totalCount: action.payload };
    case TOTAL_COUNT_COMMENTARIES:
      return { ...state, totalCountCommentaries: action.payload };
    case SET_PAGE_LIMIT:
      return { ...state, limit: action.payload };
    case SET_CREATE_DRINK_POPUP_DISPLAY:
      return { ...state, creatDrinkPopupDisplay: action.payload };
    case SEARCH_STRING_VALUE:
      return { ...state, searchString: action.payload };
    case SET_CREATE_VOTING_POPUP_DISPLAY:
      return { ...state, creatVotingPopupDisplay: action.payload };
    case SET_CREATE_TAG_POPUP_DISPLAY:
      return { ...state, createTagPopupDisplay: action.payload };
    case SET_CREATE_COMMENT_POPUP_DISPLAY:
      return { ...state, createCommentPopupDisplay: action.payload };
    case SET_USER_VOTING_LIST:
      return { ...state, userVotingList: action.payload };
    case SET_PARAMS_TO_USER_ACTIONS_INFO:
      return {
        ...state,
        userActionsInfo: [action.message, action.displayInfo],
      };
    case ADD_LIKED_COMMENTS:
      return {
        ...state,
        likedComments: action.payload,
      };
    case SET_SELECTED:
      return {
        ...state,
        selected: action.payload,
      };
    case ADD_SELECTED:
      return {
        ...state,
        selected: [...state.selected, action.payload],
      };
    case DELETE_SELECTED:
      return {
        ...state,
        selected: [
          ...state.selected.filter((selected) => selected.id != action.payload),
        ],
      };
    default:
      return state;
  }
}
export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});
export const setPageLimit = (pageLimit) => ({
  type: SET_PAGE_LIMIT,
  payload: pageLimit,
});
export const setTotalCount = (totalCount) => ({
  type: TOTAL_COUNT_DRINKS,
  payload: totalCount,
});
export const setTotalCountCommentaries = (totalCountCommentaries) => ({
  type: TOTAL_COUNT_COMMENTARIES,
  payload: totalCountCommentaries,
});
export const setCreateDrinkPopupDisplay = (display) => ({
  type: SET_CREATE_DRINK_POPUP_DISPLAY,
  payload: display,
});
export const setCreateVotingPopupDisplay = (display) => ({
  type: SET_CREATE_VOTING_POPUP_DISPLAY,
  payload: display,
});
export const setCreateCommentPopupDisplay = (display) => ({
  type: SET_CREATE_COMMENT_POPUP_DISPLAY,
  payload: display,
});
export const setCreateTagPopupDisplay = (display) => ({
  type: SET_CREATE_TAG_POPUP_DISPLAY,
  payload: display,
});
export const setUserVotingListDisplay = (display) => ({
  type: SET_USER_VOTING_LIST,
  payload: display,
});
export const setUserActionsInfo = (message, display) => ({
  type: SET_PARAMS_TO_USER_ACTIONS_INFO,
  message: message,
  displayInfo: display,
});

export const setSearchStringValue = (text) => ({
  type: SEARCH_STRING_VALUE,
  payload: text,
});
export const addLikedComments = (count) => ({
  type: ADD_LIKED_COMMENTS,
  payload: count,
});
export const setSelected = (selected) => ({
  type: SET_SELECTED,
  payload: selected,
});
export const addSelected = (item) => ({ type: ADD_SELECTED, payload: item });
export const deleteFileAction = (itemId) => ({
  type: DELETE_SELECTED,
  payload: itemId,
});
export const showLoader = () => ({
  type: SHOW_LOADER,
});
export const hideLoader = () => ({
  type: HIDE_LOADER,
});
