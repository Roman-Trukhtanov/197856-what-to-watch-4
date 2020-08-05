import {combineReducers} from "redux";
import {reducer as data, DataState} from "./data/data";
import {reducer as appState, AppState} from "./app-state/app-state";
import {reducer as user, UserState} from "./user/user";
import {reducer as review, ReviewState} from "./review/review";
import NameSpace from "./name-space";

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.APP_STATE]: appState,
  [NameSpace.USER]: user,
  [NameSpace.REVIEW]: review,
});

export type RootState = DataState & AppState & UserState & ReviewState;
