import express from "express";
import cors from "cors";

//import corporations from "./routes/corporations.js";
//import names from "./routes/names.js";
import users from "./routes/users.js";

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

//app.use("/api/names", names);
app.use("/api/users", users);
//app.use("/api/corporations", corporations);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});