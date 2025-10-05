import express from "express";
import mongoose from "mongoose";
const router = express.Router();

const corporation = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    deletedOn: { 
        type: Date, 
        default: null
    }
});

export const defaultCorporation = {
    title: "",
    userId: "",
    deletedOn: null
};

export const Corporation = mongoose.model("corporation", corporation);

export default router;