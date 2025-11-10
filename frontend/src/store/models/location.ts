export interface Location {
    _id: string,
    title: string,
    description: string,
    level: number
};

export const initLocation: Location = {
    _id: "",
    title: "",
    description: "",
    level: 1
};