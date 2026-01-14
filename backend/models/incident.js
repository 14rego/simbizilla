import mongoose from "mongoose";
import dayjs from "dayjs";
import { djsStart, djsFormat } from "../helpers/dates.js";

export const schemaIncident = new mongoose.Schema({
    on: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "onModel"
    },
    onModel: {
        type: String,
        required: true,
        enum: [
            "Organization",
            "Facility",
            "Employee"
        ]
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    title: {
        type: String,
        maxLength: 25,
        required: true,
    },
    description: {
        type: String,
        maxLength: 25,
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
    gameStart: {
        type: String, 
        required: true
    },
}, {
    timestamps: true
});

export const initIncident = {
    on: null,
    onModel: "",
    categoryId: null,
    title: "",
    description: "",
    level: 1,
    gameStart: dayjs(djsStart).format(djsFormat),
};

export const Incident = mongoose.model("Incident", schemaIncident);
