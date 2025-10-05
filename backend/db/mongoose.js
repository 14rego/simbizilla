import mongoose from "mongoose";

const uri = process.env.MONGOURI || "";
const db = process.env.MONGODBNAME || "";

const mongooseConn = async () => {
    try {
        await mongoose.connect(uri, { dbName: db });
        console.log("Successfully connected to Mongooose.");
    } catch(err) {
        console.error(err);
    }
};

export default mongooseConn;