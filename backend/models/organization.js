import mongoose from "mongoose";
import dayjs from "dayjs";

export const schemaOrganization = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        maxLength: 25,
        trim: true,
        required: true,
        unique: true,
        index: true
    },
    facilities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Facility"
    }],
    checkbooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Checkbook"
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
    gameCurrent: {
        type: String, 
        required: true
    },
    gameStart: {
        type: String, 
        required: true
    },
    deletedAt: { 
        type: Date, 
        default: null
    },
}, {
    timestamps: true,
    virtuals: {
        age: {
            get() {
                return dayjs(this.start).diff(this.current, djsIncrement);
            }
        }
    }
});

export const initOrganization = {
    userId: null,
    title: "",
    facilities: [],
    checkbooks: [],
    events: [],
    balance: 0,
    level: 1,
    gameCurrent: dayjs(djsStart).format(djsFormat),
    gameStart: dayjs(djsStart).format(djsFormat),
    deletedAt: null
};

export const Organization = mongoose.model("Organization", schemaOrganization);
