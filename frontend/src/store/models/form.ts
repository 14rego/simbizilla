
export interface ApiPayload {
    game: string,
    payload: object,
};

export const initApiPayload: ApiPayload = {
    game: "",
    payload: {},
};

export interface ApiResponse {
    data: object | null,
    errors: Array<object>,
    ok: boolean,
    status: number
};

export const initApiResponse: ApiResponse = {
    data: null,
    errors: [],
    ok: false,
    status: 500
};

export interface FormMessage {
    message: string,
    type: string
};
