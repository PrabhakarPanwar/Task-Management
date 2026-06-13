import express from "express";
import homeRouter from "./routes/authRoute.js";
import cors from "cors";
import connectDB from "./database/connect.js";
import "dotenv/config";

const allowedOrigins = [
  "http://localhost:5173",
  "https://task-management-r5rg.onrender.com",
];

const app = express();
connectDB();

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(homeRouter);

const port = process.env.PORT;
app.listen(port, () => console.log("latest"));
