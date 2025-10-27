import { combineReducers, type Reducer } from "redux";
import { sliceOrganization } from "./organization";
import { sliceUI } from "./ui";
import { sliceUser } from "./user";

const rootReducer: Reducer = combineReducers({
    organization: sliceOrganization.reducer,
    ui: sliceUI.reducer,
    user: sliceUser.reducer,
});

export default rootReducer;
