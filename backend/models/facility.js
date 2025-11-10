import mongoose from "mongoose";
import dayjs from "dayjs";
import { djsStart, djsFormat } from "../helpers/dates.js";

export const schemaFacility = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    }],
    checkbooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Checkbook"
    }],
    incidents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Incident"
    }],
    title: {
        type: String,
        maxLength: 25,
        trim: true,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    gameStart: {
        type: String, 
        required: true
    },
    deletedAt: { 
        type: Date, 
        default: null
    },
}, {
    timestamps: true
});

export const initFacility = {
    organizationId: null,
    categoryId: null,
    locationId: null,
    employees: [],
    checkbooks: [],
    incidents: [],
    title: "",
    balance: 0,
    level: 1,
    gameStart: dayjs(djsStart).format(djsFormat),
    deletedAt: null
};

export const Facility = mongoose.model("Facility", schemaFacility);
