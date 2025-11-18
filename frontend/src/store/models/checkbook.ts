import dayjs from "dayjs";
import { djsFormat, djsStart } from "../../features/formatting/helpers";

export interface Checkbook {
    _id: string,
    parentId: string,
    parentModel: string,
    categoryId: string,
    title: string,
    units: string,
    value: number,
    gameStart: string
};

export const initCheckbook: Checkbook = {
    _id: "",
    parentId: "",
    parentModel: "",
    categoryId: "",
    title: "",
    units: "",
    value: 0,
    gameStart: dayjs(djsStart).format(djsFormat)
};