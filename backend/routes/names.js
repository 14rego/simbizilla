import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
const router = express.Router();

// READ / GET ALL
router.get("/", async (req, res) => {
    let collection = await db.collection("names");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// READ / GET ONE BY ID
router.get("/:id", async (req, res) => {
    let collection = await db.collection("names");
    let query = { _id: ObjectId.createFromHexString(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// CREATE / POST ONE
router.post("/", async (req, res) => {
    try {
        let newDocument = {
            title: req.body.title,
            type: req.body.type,
        };
        
        let collection = await db.collection("names");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding name");
    }
});

// UPDATE / PATCH ONE BY ID
router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: ObjectId.createFromHexString(req.params.id) };
        const updates = {
            $set: {
                title: req.body.title,
                type: req.body.type,
            },
        };

        let collection = await db.collection("names");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating name");
    }
});

// DELETE / DELETE ONE BY ID
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: ObjectId.createFromHexString(req.params.id) };

        const collection = db.collection("names");
        let result = await collection.deleteOne(query);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting name");
    }
});

export default router;