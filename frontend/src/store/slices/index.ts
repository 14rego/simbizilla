import { combineReducers, type Reducer } from "redux";
import { sliceGame } from "./game";
import { sliceUI } from "./ui";
import { sliceUser } from "./user";

const rootReducer: Reducer = combineReducers({
    game: sliceGame.reducer,
    ui: sliceUI.reducer,
    user: sliceUser.reducer,
});

export default rootReducer;
