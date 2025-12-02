import express from "express";
import mongooseConn from "../db/mongoose.js";
import dayjs from "dayjs";
import { djsFormat } from "../helpers/dates.js";
import { Category } from "../models/category.js";
import { Location } from "../models/location.js";
import sanitize from "mongo-sanitize";
import { Facility, initFacility } from "../models/facility.js";
import { apiData, gameObject } from "../helpers/responses.js";
import { costMap } from "../helpers/money.js";

const router = express.Router();

// SUPPORT DATA
router.get("/support", async (req, res) => {
    mongooseConn().then(async () => {
        const c =  await Category.find({ type: "Facility" }),
            l = await Location.find();
        apiData(res, {
            categories: c,
            locations: l,
            costMap: costMap.locations
        }, (c.length < 1 || l.length < 1 ? 204 : 200));
    }).catch((err) => {
        apiData(res, `Error finding support for facilities`, 500, err);
    });
});

/* CREATE ONE
game: id
pl.category: id
pl.location: id
pl.title: string
*/
router.post("/create", async (req, res) => {
    mongooseConn().then(async () => {
        const org = await gameObject(sanitize(req.body.game));
        const category = await Category.findById(sanitize(req.body.payload.category));
        const location = await Location.findById(sanitize(req.body.payload.location));
        let cost = costMap.locations.find(m => m.id == location.level).init;
        if (org.balance >= cost) {
            const newFacility = await Facility.create({
                ...initFacility,
                organizationId: org._id,
                categoryId: category._id,
                locationId: location._id,
                title: sanitize(req.body.payload.title),
                gameStart: dayjs(org.gameCurrent).format(djsFormat),
            });
            org.facilities.push(newFacility);
            org.balance -= cost;
            await org.save();
            apiData(res, org);
        } else {
            apiData(res, org, 204, `Insufficient funds.`);
        }
    }).catch((err) => {
        apiData(res, `Error adding facility`, 500, err);
    });
});

export default router;
