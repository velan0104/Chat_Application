import express from "express";
import { verifyToken } from "../middlewares/Auth.middleware.js"
import { getMessages, uploadFile } from "../controllers/Message.controller.js";
import multer from "multer";

const app = express.Router();

const upload = multer({ dest: "uploads/files" });

app.use(verifyToken);

app.post("/getMessage", getMessages);
app.post("/uploadFile", upload.single("file"), uploadFile);

export default app;