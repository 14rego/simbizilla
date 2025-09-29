import express from "express";
import cors from "cors";
import names from "./routes/names.js";

const PORT = process.env.MONGOPORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/name", names);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});