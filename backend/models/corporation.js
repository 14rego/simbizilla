import mongoose from "mongoose";

export const schemaCorporation = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    deletedOn: { 
        type: Date, 
        default: null
    }
});

export const initCorporation = {
    title: "",
    user: null,
    deletedOn: null
};

export const Corporation = mongoose.model("corporation", schemaCorporation);
