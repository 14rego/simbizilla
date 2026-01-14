import mongoose from "mongoose";
import dayjs from "dayjs";
import { djsStart, djsFormat } from "../helpers/dates.js";

export const schemaCheckbook = new mongoose.Schema({
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
        maxLength: 50,
        required: true
    },
    units: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    gameStart: {
        type: String, 
        required: true
    },
});

export const initCheckbook = {
    on: null,
    onModel: "",
    categoryId: "",
    title: "",
    units: "",
    value: 0,
    gameStart: dayjs(djsStart).format(djsFormat),
};

export const Checkbook = mongoose.model("Checkbook", schemaCheckbook);
