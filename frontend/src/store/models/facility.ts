export interface Facility {
    _id: string,
    organizationId: string,
    categoryId: string,
    locationId: string,
    title: string,
    employees: [],
    checkbooks: [],
    incidents: [],
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