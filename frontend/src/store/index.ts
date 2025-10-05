import { configureStore, type Action } from "@reduxjs/toolkit";
import { type ThunkAction } from "redux-thunk";
import rootReducer from "./slices";

export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;