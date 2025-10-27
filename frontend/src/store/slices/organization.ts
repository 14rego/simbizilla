import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Organization {
    _id: string,
    title: string,
    userId: string
};

export const initOrganization: Organization = {
    _id: "",
    title: "",
    userId: ""
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