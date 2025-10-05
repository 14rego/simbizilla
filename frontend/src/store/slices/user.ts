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

export const sliceUser = createSlice({
    name: "user",
    initialState: initUser,
    reducers: {
      setUser: (state, action: PayloadAction<User>) => {
        console.log(action);
        state = action.payload;
        return state;
      },
    }
});

export const { setUser } = sliceUser.actions;

export default sliceUser.reducer;