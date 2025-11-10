import express from "express";
import cors from "cors";

import accounts from "./routes/accounts.js";
import facilities from "./routes/facilities.js";
import organizations from "./routes/organizations.js";

const PORT = process.env.MONGOPORT || 5050;
const app = express();

const allowedOrigins = ["http://localhost:5173", `http://localhost:${PORT}`];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/accounts", accounts);
app.use("/api/facilities", facilities);
app.use("/api/organizations", organizations);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});