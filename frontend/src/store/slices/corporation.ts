import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Corporation {
    _id: string,
    title: string,
    userId: string
};

export const initCorporation: Corporation = {
    _id: "",
    title: "",
    userId: ""
};

export const ssKeyCorp = "sbzCorp";

export const sliceCorporation = createSlice({
    name: "corporation",
    initialState: initCorporation,
    reducers: {
      setCorporation: (state, action: PayloadAction<Corporation>) => {
        state = action.payload;
        if (state.title != "") sessionStorage.setItem(ssKeyCorp, state.title);
        else sessionStorage.removeItem(ssKeyCorp);
        return state;
      },
      unsetCorporation: (state) => {
        state = Object.assign(initCorporation);
        sessionStorage.removeItem(ssKeyCorp);
        return state;
      },
    },
    extraReducers: (builder) => {
      builder.addCase("user/unsetUser", (state) => {
        state = Object.assign(initCorporation);
        sessionStorage.removeItem(ssKeyCorp);
        return state;
      });
    }
});

export const { setCorporation } = sliceCorporation.actions;

export default sliceCorporation.reducer;