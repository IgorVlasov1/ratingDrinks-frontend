const SET_VOTES = "SET_VOTES";
const ADD_VOTE = "ADD_VOTE";
const DELETE_VOTE = "DELETE_VOTE";
const SET_MESSAGES = "SET_MESSAGES";
const ADD_MESSAGE = "ADD_MESSAGE";
const defaultState = {
  votings: [],
  messages: [],
};
export default function votingsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_VOTES:
      return { ...state, votings: action.payload };
    case ADD_VOTE:
      return { ...state, votings: [...state.votings, action.payload] };
    case DELETE_VOTE:
      return {
        ...state,
        votings: [
          ...state.votings.filter((votings) => votings.id != action.payload),
        ],
      };
    case SET_MESSAGES:
      return { ...state, messages: action.payload };
    case ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };

    default:
      return state;
  }
}
export const setVotings = (votings) => ({ type: SET_VOTES, payload: votings });
export const addVoting = (vote) => ({ type: ADD_VOTE, payload: vote });
export const deleteVoting = (itemId) => ({
  type: DELETE_VOTE,
  payload: itemId,
});
export const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
});
export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message,
});
