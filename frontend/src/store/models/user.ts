
import type { Category } from "../models/category";
import type { Incident } from "../models/incident";
import type { Organization } from "./organization";

export interface User {
    _id: string,
    email: string,
    title: string,
    organizations?: Organization[]
    categories?: Category[]
    incidents?: Incident[],
    balance: number,
    level: number,
    deletedAt?: Date | null,
};

export const initUser: User = {
    _id: "",
    email: "",
    title: "",
    organizations: [],
    categories: [],
    incidents: [],
    balance: 0,
    level: 1,
    deletedAt: null
};
