import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initUI } from "../models/ui";
import type { FormMessage } from "../models/form";

export const sliceUI = createSlice({
    name: "ui",
    initialState: initUI,
    reducers: {
        setIsAuthorized: (state, action: PayloadAction<boolean>) => {
            state.isAuthorized = action.payload === true;
            return state;
        },
        setIsBurgerVisible: (state, action: PayloadAction<boolean>) => {
            if (state.isBurgerVisible === true && action.payload === false) {
                document.getElementById("burger")?.focus(); // for UX rules
            }
            state.isBurgerVisible = action.payload === true;
            return state;
        },
        setIsProcessing: (state, action: PayloadAction<boolean>) => {
            state.isProcessing = action.payload === true;
            return state;
        },
        setFormMessages: (state, action: PayloadAction<FormMessage[]>) => {
            state.formMessages = Object.assign(action.payload);
            return state;
        },
        unsetFormMessages: (state) => {
            state.formMessages = Object.assign(initUI.formMessages);
            return state;
        },
        setPageTitle: (state, action: PayloadAction<string>) => {
            state.pageTitle = action.payload;
            document.title = `Simbizilla | ${state.pageTitle}`;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase("user/unsetUser", (state) => {
            state.isAuthorized = false;
            return state;
        });
    }
});

export const { 
    setIsAuthorized, 
    setIsBurgerVisible,
    setIsProcessing,
    setFormMessages,
    unsetFormMessages,
    setPageTitle
} = sliceUI.actions;

export default sliceUI.reducer;