import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { djsFormat, djsStart } from "../../features/formatting/helpers";

export interface Organization {
    _id: string,
    userId: string
    title: string,
    facilities?: [],
    checkbooks?: [],
    incidents?: [],
    balance: number,
    level: number,
    gameCurrent: string,
    gameStart: string,
    deletedAt?: Date | null
};

export const initOrganization: Organization = {
    _id: "",
    userId: "",
    title: "",
    facilities: [],
    checkbooks: [],
    incidents: [],
    balance: 0,
    level: 1,
    gameCurrent: dayjs(djsStart).format(djsFormat),
    gameStart: dayjs(djsStart).format(djsFormat),
    deletedAt: null
};

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