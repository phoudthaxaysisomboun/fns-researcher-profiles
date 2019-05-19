import { combineReducers } from "redux";
import user from "./user_reducer";
import research from "./research_reducer";
const rootReducer = combineReducers({
  user,
  research
});

export default rootReducer;
