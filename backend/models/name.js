import mongoose from "mongoose";

export const schemaName = new mongoose.Schema({
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
    },
    adminApproved: Boolean,
}, {
    timestamps: true
});

export const initName = {
    categoryId: null,
    title: "",
    adminApproved: true // TODO: admin approval later
};

export const Name = mongoose.model("Name", schemaName);
