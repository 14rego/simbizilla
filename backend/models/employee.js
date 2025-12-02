import mongoose from "mongoose";
import dayjs from "dayjs";
import { djsStart, djsFormat } from "../helpers/dates.js";

export const schemaEmployee = new mongoose.Schema({
    facilityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Facility",
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
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
        type: mongoose.Types.Double,
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

export const initEmployee = {
    facilityId: null,
    categoryId: null,
    checkbooks: [],
    incidents: [],
    title: "",
    balance: 0,
    level: 1,
    gameStart: dayjs(djsStart).format(djsFormat),
    deletedAt: null
};

export const Employee = mongoose.model("Employee", schemaEmployee);
