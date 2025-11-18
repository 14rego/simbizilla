import _ from "lodash";

export interface ApiPayload<PayloadData> {
    game: string,
    payload: PayloadData
};

export function typedApiPayload<PayloadData> (pl: PayloadData, g: string = "") {
    return _.merge({}, {
        game: g,
        payload: pl
    });
};

export interface ApiResponse {
    data: object | null,
    errors: object[],
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
