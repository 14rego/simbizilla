import mongoose from "mongoose";

export const schemaLocation = new mongoose.Schema({
    title: {
        type: String,
        maxLength: 25,
    },
    description: {
        type: String,
        maxLength: 250,
    },
    level: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});

export const initLocation = {
    title: "",
    description: "",
    level: 1,
};

export const Location = mongoose.model("Location", schemaLocation);
