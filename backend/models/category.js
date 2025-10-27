import mongoose from "mongoose";

export const schemaCategory = new mongoose.Schema({
    title: {
        type: String,
        maxLength: 25,
        trim: true,
        required: true,
        unique: true,
        index: true
    },
    type: {
        type: String,
        maxLength: 25,
        required: true,
    },
    description: {
        type: String,
        maxLength: 100,
        required: true,
    },
});

export const initCategory = {
    title: "",
    type: "",
};

export const Category = mongoose.model("Category", schemaCategory);
