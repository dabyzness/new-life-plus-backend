import express, { Request, Response } from "express";
import cors from "cors";

// import { getTasks } from "./db/index";

import db from "./db";

const app: express.Application = express();
const port: number = 3000;

app.use(cors());
app.use(express.json());

app.get("/");

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

export { app };
