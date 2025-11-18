import type { Checkbook } from "./checkbook";
import type { Employee } from "./employee";
import type { Incident } from "./incident";

export interface Facility {
    _id: string,
    organizationId: string,
    categoryId: string,
    locationId: string,
    title: string,
    employees: Employee[],
    checkbooks: Checkbook[],
    incidents: Incident[],
    balance: number,
    level: number,
    gameStart: string,
    deletedAt?: Date | null
};

export const initFacility: Facility = {
    _id: "",
    organizationId: "",
    categoryId: "",
    locationId: "",
    title: "",
    employees: [],
    checkbooks: [],
    incidents: [],
    balance: 0,
    level: 1,
    gameStart: "",
    deletedAt: null
};