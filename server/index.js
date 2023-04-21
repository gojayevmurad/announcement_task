import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import userRouter from "./Routers/userRouter.js";
import announcementRouter from "./Routers/announcementRouter.js";
import adminRouter from "./Routers/adminRouter.js";

import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/announcements", announcementRouter);
app.use("/admin", adminRouter);
app.use(fileUpload({ useTempFiles: true }));

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
});
