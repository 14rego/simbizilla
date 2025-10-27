import mongoose from "mongoose";
import dayjs from "dayjs";

export const schemaEvent = new mongoose.Schema({
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

export const initEvent = {
    parentId: null,
    parentModel: "",
    categoryId: null,
    title: "",
    description: "",
    level: 1,
    gameStart: dayjs(djsStart).format(djsFormat),
};

export const Event = mongoose.model("Event", schemaEvent);
