import dayjs from "dayjs";

export const djsStart = dayjs("05-01-1979");
export const djsFormat = "MMM YYYY";
export const djsIncrement = "month";

export const monetize = (amount: number): string => {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });
    return formatter.format(amount).replace(".00", "");
};