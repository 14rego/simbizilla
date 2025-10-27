import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { djsFormat, djsStart } from "./ui";

export interface Organization {
    _id: string,
    userId: string
    title: string,
    facilities?: [],
    checkbooks?: [],
    events?: [],
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
    events: [],
    balance: 0,
    level: 1,
    gameCurrent: dayjs(djsStart).format(djsFormat),
    gameStart: dayjs(djsStart).format(djsFormat),
    deletedAt: null
};

export const ssKeyCorp = "sbzCorp";

export const sliceOrganization = createSlice({
    name: "organization",
    initialState: initOrganization,
    reducers: {
      setOrganization: (state, action: PayloadAction<Organization>) => {
        state = action.payload;
        if (state.title != "") sessionStorage.setItem(ssKeyCorp, state.title);
        else sessionStorage.removeItem(ssKeyCorp);
        return state;
      },
      unsetOrganization: (state) => {
        state = Object.assign(initOrganization);
        sessionStorage.removeItem(ssKeyCorp);
        return state;
      },
    },
    extraReducers: (builder) => {
      builder.addCase("user/unsetUser", (state) => {
        state = Object.assign(initOrganization);
        sessionStorage.removeItem(ssKeyCorp);
        return state;
      });
    }
});

export const { setOrganization } = sliceOrganization.actions;

export default sliceOrganization.reducer;