import express from "express";
import sanitize from "mongo-sanitize";
import { apiData, gameObject } from "../helpers/responses.js";

const router = express.Router();

// READ ONE
router.get("/:id", async (req, res) => {
    const game = await gameObject(sanitize(req.params.id));
    apiData(res, game);
});

export default router;