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
    nickname: {
        type: String,
        maxLength: 25,
        trim: true,
        required: true
    },
    adminApproved: Boolean,
    deletedOn: { 
        type: Date, 
        default: null
    },
    corporations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "corporation"
    }]
});

export const initUser = {
    email: "",
    nickname: "",
    adminApproved: true, // TODO: make admin approval later
    deletedOn: null
};

export const User = mongoose.model("user", schemaUser);
