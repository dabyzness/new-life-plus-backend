import express, { Request, Response } from "express";
import cors from "cors";
require("dotenv").config();

import { router as indexRouter } from "./routes/index";
import { router as profileRouter } from "./routes/api/profile";
import { router as attributeRouter } from "./routes/api/attribute/attribute";

const app = express();
const port = process.env.PORT || null;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/api/profile", profileRouter);
// app.use("/api", attributeRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

export { app };
