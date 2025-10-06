import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UIObj {
  isAuthorized: boolean,
  isBurgerVisible: boolean,
  pageTitle: string
};

export const initUI: UIObj = {
  isAuthorized: false,
  isBurgerVisible: false,
  pageTitle: "Error"
};

export const sliceUI = createSlice({
    name: "ui",
    initialState: initUI,
    reducers: {
      setIsAuthorized: (state, action: PayloadAction<boolean>) => {
        state.isAuthorized = action.payload;
        return state;
      },
      setIsBurgerVisible: (state, action: PayloadAction<boolean>) => {
        state.isBurgerVisible = action.payload;
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
  setPageTitle
} = sliceUI.actions;

export default sliceUI.reducer;