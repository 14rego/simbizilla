import express from "express";
import mongooseConn from "../db/mongoose.js";
import { User } from "../models/user.js";
import { Organization, initOrganization } from "../models/organization.js";
import sanitize from "mongo-sanitize";

const router = express.Router();

// READ / ALL CORPS BY USER ID
router.get("/byuser/:id", async (req, res) => {
    mongooseConn().then(async () => {
        let response = [];
        const gotUser = await User.findById(sanitize(req.params.id));
        console.log(gotUser);
        if (gotUser) {
            const gotCorps = await Organization.find({
                userId: gotUser._id
            });
            console.log(gotCorps);
            if (gotCorps) response = Object.assign(gotCorps);
        }
        res.send(response).status(response.length < 1 ? 204 : 200);
    }).catch((err) => {
        console.error(err);
        res.status(500).send(`Error finding organizations for user: ${req.params.email}`);
    });
});

// READ / ONE
router.get("/:id", async (req, res) => {
    mongooseConn().then(async () => {
        const gotCorp = await Organization.findById(sanitize(req.params.id));
        let response = Object.assign(initOrganization);
        if (gotCorp) response = Object.assign(gotCorp);
        res.send(response).status(gotCorp ? 200 : 204);
    }).catch((err) => {
        console.error(err);
        res.status(500).send(`Error finding organizations for user: ${req.params.email}`);
    });
});

export default router;