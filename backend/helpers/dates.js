import dayjs from "dayjs";

export const djsStart = "05-01-1979";
export const djsFormat = "MMM YYYY";
export const djsIncrement = "month";

export const sortGameStartAsc = (a, b) => {
    return (dayjs(a.gameStart).valueOf() > dayjs(b.gameStart).valueOf()) ? 1 : -1;
}

export const sortGameStartDesc = (a, b) => {
    return (dayjs(a.gameStart).valueOf() > dayjs(b.gameStart).valueOf()) ? -1 : 1;
}