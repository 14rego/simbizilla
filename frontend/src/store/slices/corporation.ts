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

export const sliceCorporation = createSlice({
    name: "corporation",
    initialState: initCorporation,
    reducers: {
      setCorporation: (state, action: PayloadAction<Corporation>) => {
        console.log(action);
        state = action.payload;
        return state;
      },
    }
});

export const { setCorporation } = sliceCorporation.actions;

export default sliceCorporation.reducer;