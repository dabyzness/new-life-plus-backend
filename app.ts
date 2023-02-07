import express, { Request, Response } from "express";
import cors from "cors";
require("dotenv").config();

import { router as indexRouter } from "./routes/index";

const app = express();
const port = process.env.PORT || null;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

export { app };
