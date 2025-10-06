import { combineReducers, type Reducer } from "redux";
import { sliceUser } from "./user";
import { sliceCorporation } from "./corporation";
import { sliceForm } from "./forms";
import { sliceUI } from "./ui";

const rootReducer: Reducer = combineReducers({
    ui: sliceUI.reducer,
    forms: sliceForm.reducer,
    user: sliceUser.reducer,
    corporation: sliceCorporation.reducer
});

export default rootReducer;
