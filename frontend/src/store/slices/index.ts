import { combineReducers, type Reducer } from "redux";
import { sliceUser } from "./user";
import { sliceCorporation } from "./corporation";
import { sliceForm } from "./forms";

const rootReducer: Reducer = combineReducers({
    forms: sliceForm.reducer,
    user: sliceUser.reducer,
    corporation: sliceCorporation.reducer
});

export default rootReducer;
