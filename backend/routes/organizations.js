import express from "express";
import mongooseConn from "../db/mongoose.js";
import sanitize from "mongo-sanitize";
import { apiData, gameObject } from "../helpers/responses.js";
import { costMap } from "../helpers/money.js";
import { Checkbook, initCheckbook } from "../models/checkbook.js";
import { Location } from "../models/location.js";
import { Category } from "../models/category.js";
import dayjs from "dayjs";
import { djsIncrement, djsFormat } from "../helpers/dates.js";

const router = express.Router();

// READ ONE
router.get("/:id", async (req, res) => {
    mongooseConn().then(async () => {
        const game = await gameObject(sanitize(req.params.id));
        apiData(res, game);
    }).catch((err) => {
        apiData(res, `Error reading game`, 500, err);
    });
});

/* CREATE ONE
game: id
*/
router.post("/play", async (req, res) => {
    mongooseConn().then(async () => {
        const org = await gameObject(sanitize(req.body.game));
        if (org) {
            const nextGameStart = dayjs(org.gameCurrent).add(1, djsIncrement).format(djsFormat);
            const locations = await Location.find({});
            const categories = await Category.find({});
            const tempCheckbooks = []
            org.facilities?.forEach((facility) => {
                // RENT!
                const location = locations.find(l => l._id == facility.locationId.toString());
                const rent = costMap.locations.find(m => m.id == location.level).iter;
                const category = categories.find(c => c.title == rent.title);
                if (rent && category) {
                    tempCheckbooks.push(new Checkbook({
                        ...initCheckbook,
                        on: org._id,
                        onModel: "Organization",
                        categoryId: category._id,
                        title: `${category.title}: ${facility.title}`,
                        units: djsIncrement,
                        value: -rent.amount,
                        gameStart: nextGameStart
                    }));
                    org.balance -= rent.amount;
                }
            });
            if (org.balance >= 0) {
                org.gameCurrent = nextGameStart;
                const cbks = await Checkbook.create(tempCheckbooks);
                cbks.forEach(cbk => {
                    org.checkbooks.push(cbk);
                });
                await org.save();
                apiData(res, org);
            } else {
                apiData(res, org, 204, `Insufficient funds.`);
            }
        } else {
            apiData(res, null, 500, `Invalid game.`);
        }
    }).catch((err) => {
        apiData(res, `Error adding facility`, 500, err);
    });
});


export default router;