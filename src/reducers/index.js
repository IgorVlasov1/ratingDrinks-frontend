import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import appReducer from "./appReducer";
import drinksReducer from "./drinksReducer";
import votingsReducer from "./votingsReducer";
const rootReducer = combineReducers({
  user: userReducer,
  drinks: drinksReducer,
  votes: votingsReducer,
  app: appReducer,
});
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
