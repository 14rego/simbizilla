import mongoose from "mongoose";

export const schemaUser = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    nickname: {
        type: String,
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
