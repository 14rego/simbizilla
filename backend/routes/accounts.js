import express from "express";
import mongooseConn from "../db/mongoose.js";
import _ from "lodash";
import { Category } from "../models/category.js";
import { User, initUser } from "../models/user.js";
import { Organization, initOrganization } from "../models/organization.js";
import sanitize from "mongo-sanitize";

const router = express.Router();

// CREATE / POST ONE
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
            email: sanitize(req.body.email),
            title: sanitize(req.body.title),
            categories: [ role.id ]
        });
        console.log(newUser);
        response.user = Object.assign(newUser);
        if (newUser) {
            const newCorp = await Organization.create({
                ...initOrganization,
                userId: newUser._id,
                title: sanitize(req.body.organization),
            });
            console.log(newCorp);
            if (newCorp) {
                newUser.organizations.push(newCorp._id);
                await newUser.save();
                response.user = Object.assign(newUser);
                response.organization = Object.assign(newCorp);
            }
        }
        res.send(response).status(!response.user || !response.organization ? 204 : 200);
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
            organization: null
        };
        const role = await Category.findOne({ type: "User", title: "Player" });
        const gotUser = await User.findOne({
            email: sanitize(req.body.email),
            categories: role._id
        }).populate("organizations");
        if (gotUser) {
            response.user = Object.assign(gotUser);
            const gotCorp = await Organization.findOne({
                title: sanitize(req.body.organization),
                userId: gotUser._id
            });
            if (gotCorp) {
                response.organization = Object.assign(gotCorp);
            }
        }
        res.send(response).status(!response.user || !response.organization ? 204 : 200);
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Error finding sign in info");
    });
});

export default router;