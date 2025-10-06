import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Corporation } from "./corporation";

export interface User {
    _id: string,
    email: string,
    nickname: string,
    adminApproved: boolean,
    deletedOn?: Date | null,
    corporations?: Corporation[]
};

export const initUser: User = {
    _id: "",
    email: "",
    nickname: "",
    adminApproved: true, // TODO: approval process
};

export const ssKeyUser = "sbzUser";

export const sliceUser = createSlice({
    name: "user",
    initialState: initUser,
    reducers: {
      setUser: (state, action: PayloadAction<User>) => {
        state = action.payload;
        sessionStorage.setItem(ssKeyUser, state.email);
        return state;
      },
      unsetUser: (state) => {
        state = Object.assign(initUser);
        sessionStorage.removeItem(ssKeyUser);
        return state;
      },
    }
});

export const { setUser, unsetUser } = sliceUser.actions;

export default sliceUser.reducer;