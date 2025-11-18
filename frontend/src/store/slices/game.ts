import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initOrganization, type Organization } from "../models/organization";

export const ssKeyOrg = "sbzOrg";

export const sliceGame = createSlice({
    name: "game",
    initialState: initOrganization,
    reducers: {
        setGame: (state, action: PayloadAction<Organization>) => {
            state = action.payload;
            if (state.title != "") sessionStorage.setItem(ssKeyOrg, state.title);
            else sessionStorage.removeItem(ssKeyOrg);
            return state;
        },
        unsetGame: (state) => {
            state = Object.assign(initOrganization);
            sessionStorage.removeItem(ssKeyOrg);
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase("user/unsetUser", (state) => {
            state = Object.assign(initOrganization);
            sessionStorage.removeItem(ssKeyOrg);
            return state;
        });
    }
});

export const { setGame, unsetGame } = sliceGame.actions;

export default sliceGame.reducer;