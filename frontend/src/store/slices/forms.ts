import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SignX {
  email: string,
  nickname?: string,
  corporation: string,
};

export const initSignX: SignX = {
  email: "",
  nickname: "",
  corporation: ""
};

export interface FormMessage {
  message: string,
  type: string
};

export interface Forms {
  messages: FormMessage[]
};

export const initForms: Forms = {
  messages: []
};

export const sliceForm = createSlice({
    name: "forms",
    initialState: initForms,
    reducers: {
      setFormMessages: (state, action: PayloadAction<FormMessage[]>) => {
        state.messages = Object.assign(action.payload);
        return state;
      },
      unsetFormMessages: (state) => {
        state.messages = Object.assign(initForms.messages);
        return state;
      },
    }
});

export const { setFormMessages, unsetFormMessages } = sliceForm.actions;

export default sliceForm.reducer;