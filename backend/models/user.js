import mongoose from "mongoose";

export const schemaUser = new mongoose.Schema({
    organizations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization"
    }],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }],
    incidents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Incident"
    }],
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
    balance: {
        type: mongoose.Types.Double,
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
    organizations: [],
    categories: [],
    incidents: [],
    email: "",
    title: "",
    balance: 0,
    level: 1,
    deletedAt: null
};

export const User = mongoose.model("User", schemaUser);
