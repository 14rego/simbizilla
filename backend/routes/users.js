import express from "express";
import mongooseConn from "../db/mongoose.js";
import mongoose from "mongoose";
import _ from "lodash";
import { Corporation, defaultCorporation } from "./corporations.js";

const router = express.Router();

const user = new mongoose.Schema({
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
    }
});

export const defaultUser = {
    email: "",
    nickname: "",
    adminApproved: true, // TODO: make admin approval later
    deletedOn: null
};

const User = mongoose.model("user", user);

// CREATE / POST ONE
router.post("/signup", async (req, res) => {
    // TODO: sanitize, yo
    mongooseConn().then(async () => {
        await User.create({
            ...defaultUser,
            email: req.body.email.trim().toString(),
            nickname: req.body.nickname.trim().toString(),
            adminApproved: true, // TODO: don't auto-approve
        }).then(async (newUser) => {
            const newCorp = await Corporation.create({
                ...defaultCorporation,
                title: req.body.corporation.toString().trim(),
                userId: newUser._id
            });
            res.send({
                user: newUser,
                corporation: newCorp
            }).status(200);
        });
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Error adding user");
    });
});

// READ / GET ONE
router.post("/signin", async (req, res) => {
    // TODO: sanitize, yo
    mongooseConn().then(async () => {
        let status = 200;
        const user = await User.findOne({
            email: req.body.email.trim().toString(),
            adminApproved: true,
        });
        console.log(user);
        if (user) {
            const corp = await Corporation.findOne({
                title: req.body.corporation.toString().trim(),
                userId: user._id
            });
            console.log(corp);
            if (corp) {
                res.send({
                    user: user,
                    corporation: corp
                }).status(200);
            }
        } else {
            res.send({
                user: user,
                corporation: null
            }).status(204);
        }
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Error finding sign in info");
    });
});

export default router;