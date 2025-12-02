import dayjs from "dayjs";
import { djsFormat, djsStart } from "../../helpers/format";
import type { Facility } from "./facility";
import type { Incident } from "./incident";
import type { Checkbook } from "./checkbook";

export interface Organization {
    _id: string,
    userId: string
    title: string,
    facilities?: Facility[],
    checkbooks?: Checkbook[],
    incidents?: Incident[],
    balance: number,
    level: number,
    gameCurrent: string,
    gameStart: string,
    deletedAt?: Date | null
};

export const initOrganization: Organization = {
    _id: "",
    userId: "",
    title: "",
    facilities: [],
    checkbooks: [],
    incidents: [],
    balance: 0,
    level: 1,
    gameCurrent: dayjs(djsStart).format(djsFormat),
    gameStart: dayjs(djsStart).format(djsFormat),
    deletedAt: null
};
