const SET_FILES = "SET_FILES";
const ADD_FILE = "ADD_FILE";
const DELETE_FILE = "DELETE_FILE";
const SET_TAGS = "SET_TAGS";
const ADD_TAG = "ADD_TAGS";
const SET_COMMENTS = "SET_COMMENTS";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const defaultState = {
  files: [],
  comments: [],
  tags: [],
};

export default function drinksReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_FILES:
      return { ...state, files: action.payload };
    case ADD_FILE:
      return { ...state, files: [...state.files, action.payload] };
    case DELETE_FILE:
      return {
        ...state,
        files: [...state.files.filter((file) => file.id != action.payload)],
      };
    case SET_COMMENTS:
      return { ...state, comments: action.payload };
    case ADD_COMMENT:
      return { ...state, comments: [...state.comments, action.payload] };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: [
          ...state.comments.filter((comment) => comment.id != action.payload),
        ],
      };
    case SET_TAGS:
      return { ...state, tags: action.payload };
    case ADD_TAG:
      return { ...state, tags: [...state.tags, action.payload] };
    default:
      return state;
  }
}
export const setFiles = (files) => ({ type: SET_FILES, payload: files });
export const addFile = (file) => ({ type: ADD_FILE, payload: file });
export const deleteFile = (fileId) => ({
  type: DELETE_FILE,
  payload: fileId,
});
export const setComments = (comments) => ({
  type: SET_COMMENTS,
  payload: comments,
});
export const addComment = (comment) => ({
  type: ADD_COMMENT,
  payload: comment,
});
export const deleteComment = (commId) => ({
  type: DELETE_COMMENT,
  payload: commId,
});
export const setTags = (tags) => ({ type: SET_TAGS, payload: tags });
export const addTag = (tag) => ({ type: ADD_TAG, payload: tag });
