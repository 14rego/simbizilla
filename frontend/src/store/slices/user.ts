import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "../models/category";
import type { Event } from "../models/event";
import type { Organization } from "./organization";

export interface User {
    _id: string,
    email: string,
    title: string,
    organizations?: Organization[]
    categories?: Category[]
    events?: Event[],
    balance: number,
    level: number,
    deletedAt?: Date | null,
};

export const initUser: User = {
    _id: "",
    email: "",
    title: "",
    organizations: [],
    categories: [],
    events: [],
    balance: 0,
    level: 1,
    deletedAt: null
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