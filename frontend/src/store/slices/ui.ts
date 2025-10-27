import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export const djsStart = dayjs("05-01-1979");
export const djsFormat = "MMM YYYY";
export const djsIncrement = "month";

export interface SignX {
  email: string,
  title?: string,
  organization: string,
};

export const initSignX: SignX = {
  email: "",
  title: "",
  organization: ""
};

export interface FormMessage {
  message: string,
  type: string
};

export interface UIObj {
  isAuthorized: boolean,
  isBurgerVisible: boolean,
  pageTitle: string,
  formMessages: FormMessage[],
};

export const initUI: UIObj = {
  isAuthorized: false,
  isBurgerVisible: false,
  pageTitle: "Error",
  formMessages: []
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
        if (state.isBurgerVisible == true && action.payload == false) {
            document.getElementById("burger")?.focus();
        }
        state.isBurgerVisible = action.payload;
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
  setFormMessages,
  unsetFormMessages,
  setPageTitle
} = sliceUI.actions;

export default sliceUI.reducer;