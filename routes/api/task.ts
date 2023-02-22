import { Router } from "express";
import { auth } from "../../middlewares/auth";
import * as taskController from "../../controllers/task";

const router = Router();

router.post("/create", auth, taskController.create);

export { router };
