import dayjs from "dayjs";
import mongoose from "mongoose";

export const schemaUser = new mongoose.Schema({
    email: {
        type: String,
        maxLength: 40,
        required: true,
        trim: true,
        unique: true,
        index: true
    },
    title: {
        type: String,
        maxLength: 25,
        trim: true,
        required: true
    },
    organizations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization"
    }],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }],
    balance: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    deletedAt: { 
        type: Date,
        default: null
    },
}, {
    timestamps: true
});

export const initUser = {
    email: "",
    title: "",
    organizations: [],
    categories: [],
    events: [],
    balance: 0,
    level: 1,
    deletedAt: null
};

export const User = mongoose.model("User", schemaUser);
