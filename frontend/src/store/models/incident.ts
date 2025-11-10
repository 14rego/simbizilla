import dayjs from "dayjs";
import { djsFormat, djsStart } from "../slices/ui";

export interface Incident {
    _id: string,
    parentId: string,
    parentModel: string,
    categoryId: string,
    title: string,
    description: string,
    level: number,
    gameStart: string
};

export const initIncident: Incident = {
    _id: "",
    parentId: "",
    parentModel: "",
    categoryId: "",
    title: "",
    description: "",
    level: 1,
    gameStart: dayjs(djsStart).format(djsFormat)
};