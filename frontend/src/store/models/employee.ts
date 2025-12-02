import dayjs from "dayjs";
import { djsFormat, djsStart } from "../../helpers/format";
import type { Checkbook } from "./checkbook";
import type { Incident } from "./incident";

export interface Employee {
    _id: string,
    facilityId: string,
    categoryId: string,
    checkbooks: Checkbook[],
    incidents: Incident[],
    title: string,
    balance: number,
    level: number,
    gameStart: string,
    deletedAt?: Date | null
};

export const initEmployee: Employee = {
    _id: "",
    facilityId: "",
    categoryId: "",
    checkbooks: [],
    incidents: [],
    title: "",
    balance: 0,
    level: 1,
    gameStart: dayjs(djsStart).format(djsFormat),
    deletedAt: null
};