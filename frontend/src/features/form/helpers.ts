import _ from "lodash";
import type { SetStateAction } from "react";
import { typedApiPayload, type ApiPayload } from "../../store/models/form";

const apiURL = import.meta.env.VITE_APIURL;

export const handleBlur = (target: HTMLInputElement) => {
    target.reportValidity();
};

export const apiGet = async (path: string) => {
    return fetch(`${apiURL}${path}`, {
        method: "GET",
    })
    .then(resp => {
        if (!resp.ok) {
            console.error(resp);
            throw new Error(`Error! Status: ${resp.status}`);
        }
        return resp.json();
    });
};

export const apiPost = async (path: string, body: object) => {
    return fetch(`${apiURL}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })
    .then(resp => {
        if (!resp.ok) {
            console.error(resp);
            throw new Error(`Error! Status: ${resp.status}`);
        }
        return resp.json();
    });
};

export function updateForm<PayloadData> (
    setter: React.Dispatch<SetStateAction<ApiPayload<PayloadData>>>, 
    vals: unknown) {
    return setter((prev: ApiPayload<PayloadData>) => {
        return typedApiPayload(_.merge({}, prev.payload, vals), prev.game);
    });
};