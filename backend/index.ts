import express, { type Application } from "express";
import cors from "cors";

import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Cors Not Allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.get("/", (req, res) => {
  res.send("API Running");
});
app.post("/", (req, res) => {
  res.send("Got a response from frontend");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running at port", PORT);
});
