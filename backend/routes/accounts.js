import express from "express";
import mongooseConn from "../db/mongoose.js";
import _ from "lodash";
import { Category } from "../models/category.js";
import { User, initUser } from "../models/user.js";
import { Organization, initOrganization } from "../models/organization.js";
import sanitize from "mongo-sanitize";
import { apiData, gameObject } from "../helpers/responses.js";

const router = express.Router();

/* CREATE ONE
email: string
title: string
organization: string
*/
router.post("/signup", async (req, res) => {
    mongooseConn().then(async () => {
        const response = {
            user: null,
            organization: null
        };
        const role = await Category.findOne({
            type: "User",
            title: "Player", // TODO: start with "Waiting"
        });
        const newUser = await User.create({
            ...initUser,
            email: sanitize(req.body.payload.email),
            title: sanitize(req.body.payload.title),
            categories: [ role.id ]
        });
        response.user = Object.assign(newUser);
        if (newUser) {
            const newCorp = await Organization.create({
                ...initOrganization,
                userId: newUser._id,
                title: sanitize(req.body.payload.organization),
            });
            if (newCorp) {
                newUser.organizations.push(newCorp._id);
                await newUser.save();
                response.user = Object.assign(newUser);
                response.organization = Object.assign(newCorp);
            }
        }
        apiData(res, response, (!response.user || !response.organization ? 204 : 200));
    }).catch((err) => {
        apiData(res, `Error adding user`, 500, err);
    });
});

/* READ ONE
email: string
organization: string
*/
router.post("/signin", async (req, res) => {
    mongooseConn().then(async () => {
        const response = {
            user: null,
            organization: null
        };
        const role = await Category.findOne({ type: "User", title: "Player" });
        const gotUser = await User.findOne({
            email: sanitize(req.body.payload.email),
            categories: role._id
        }).populate("organizations", "-checkbooks -incidents");
        if (gotUser) {
            response.user = gotUser;
            const gotOrg = await Organization.findOne({
                title: sanitize(req.body.payload.organization),
                userId: gotUser._id
            });
            if (gotOrg) {
                response.organization = await gameObject(gotOrg._id);
            }
        }
        apiData(res, response, (!response.user || !response.organization ? 204 : 200));
    }).catch((err) => {
        apiData(res, `Error finding sign in info`, 500, err);
    });
});

export default router;