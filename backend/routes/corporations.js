import express from "express";
import mongooseConn from "../db/mongoose.js";
import { User } from "../models/user.js"
import { Corporation } from "../models/corporation.js"

const router = express.Router();

// READ / ALL CORPS BY USER EMAIL
router.get("/:email", async (req, res) => {
    // TODO: sanitize, yo
    mongooseConn().then(async () => {
        let response = [];
        const gotUser = await User.findOne({
            email: req.params.email.trim().toString(),
        });
        console.log(gotUser);
        if (gotUser) {
            const gotCorps = await Corporation.find({
                userId: gotUser._id
            });
            console.log(gotCorps);
            if (gotCorps) response = Object.assign(gotCorps);
        }
        res.send(response).status(response.length < 1 ? 204 : 200);
    }).catch((err) => {
        console.error(err);
        res.status(500).send(`Error finding corporations for user: ${req.params.email}`);
    });
});

export default router;