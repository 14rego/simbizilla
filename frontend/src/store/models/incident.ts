import dayjs from "dayjs";
import { djsFormat, djsStart } from "../../helpers/format";

export interface Incident {
    _id: string,
    on: string,
    onModel: string,
    categoryId: string,
    title: string,
    description: string,
    level: number,
    gameStart: string
};

export const initIncident: Incident = {
    _id: "",
    on: "",
    onModel: "",
    categoryId: "",
    title: "",
    description: "",
    level: 1,
    gameStart: dayjs(djsStart).format(djsFormat)
};