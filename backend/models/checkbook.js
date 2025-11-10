import mongoose from "mongoose";
import dayjs from "dayjs";
import { djsStart, djsFormat } from "../helpers/dates.js";

export const schemaCheckbook = new mongoose.Schema({
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "parentModel"
    },
    parentModel: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    title: {
        type: String,
        maxLength: 25,
        trim: true,
        required: true,
        unique: true,
        index: true
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
    parentId: "",
    parentModel: "",
    caregoryId: "",
    title: "",
    units: "",
    value: 0,
    gameStart: dayjs(djsStart).format(djsFormat),
};

export const Checkbook = mongoose.model("Checkbook", schemaCheckbook);
