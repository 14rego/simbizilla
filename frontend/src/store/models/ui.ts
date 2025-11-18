import type { FormMessage } from "./form";

export interface UIObj {
    isAuthorized: boolean,
    isBurgerVisible: boolean,
    isProcessing: boolean,
    pageTitle: string,
    formMessages: FormMessage[],
};

export const initUI: UIObj = {
    isAuthorized: false,
    isBurgerVisible: false,
    isProcessing: false,
    pageTitle: "Error",
    formMessages: []
};