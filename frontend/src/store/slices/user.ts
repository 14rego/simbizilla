import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
    _id: string,
    email: string,
    nickname: string,
    adminApproved: boolean,
    deletedOn?: Date | null,
    corporationIds?: string[]
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
        state = initUser;
        sessionStorage.removeItem(ssKeyUser);
        return state;
      },
    }
});

export const { setUser, unsetUser } = sliceUser.actions;

export default sliceUser.reducer;