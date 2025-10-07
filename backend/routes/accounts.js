import express from "express";
import mongooseConn from "../db/mongoose.js";
import _ from "lodash";
import { User, initUser } from "../models/user.js";
import { Corporation, initCorporation } from "../models/corporation.js";
import sanitize from "mongo-sanitize";

const router = express.Router();

// CREATE / POST ONE
router.post("/signup", async (req, res) => {
    mongooseConn().then(async () => {
        const response = {
            user: null,
            corp: null
        };
        const newUser = await User.create({
            ...initUser,
            email: sanitize(req.body.email),
            nickname: sanitize(req.body.nickname),
            adminApproved: true, // TODO: don't auto-approve
        });
        console.log(newUser);
        if (newUser) {
            response.user = Object.assign(newUser);
            const newCorp = await Corporation.create({
                ...initCorporation,
                title: sanitize(req.body.corporation),
                userId: user._id
            });
            console.log(newCorp);
            if (newCorp) {
                response.corporation = Object.assign(newCorp);
                await User.findByIdAndUpdate(newUser._id, {
                    $push: { corporations: newCorp._id }
                });
            }
        }
        res.send(response).status(!response.user || !response.corporation ? 204 : 200);
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Error adding user");
    });
});

// READ / GET ONE
router.post("/signin", async (req, res) => {
    mongooseConn().then(async () => {
        const response = {
            user: null,
            corporation: null
        };
        const gotUser = await User.findOne({
            email: sanitize(req.body.email),
            adminApproved: true,
        }).populate("corporations");
        console.log(gotUser);
        if (gotUser) {
            response.user = Object.assign(gotUser);
            const gotCorp = await Corporation.findOne({
                title: sanitize(req.body.corporation),
                userId: gotUser._id
            });
            console.log(gotCorp);
            if (gotCorp) {
                response.corporation = Object.assign(gotCorp);
                await User.findByIdAndUpdate(gotUser._id, {
                    $addToSet: { corporations: gotCorp._id }
                });
            }
        }
        res.send(response).status(!response.user || !response.corporation ? 204 : 200);
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Error finding sign in info");
    });
});

export default router;