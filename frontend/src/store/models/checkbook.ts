import dayjs from "dayjs";
import { djsFormat, djsStart } from "../../helpers/format";

export interface Checkbook {
    _id: string,
    on: string,
    onModel: string,
    categoryId: string,
    title: string,
    units: string,
    value: number,
    gameStart: string
};

export const initCheckbook: Checkbook = {
    _id: "",
    on: "",
    onModel: "",
    categoryId: "",
    title: "",
    units: "",
    value: 0,
    gameStart: dayjs(djsStart).format(djsFormat)
};

export interface CostMapItem {
    title: string,
    amount: number
};

export interface CostMap {
    id: number,
    init: CostMapItem,
    iter: CostMapItem
};