import { Router } from "express";
import * as profileController from "../../controllers/profile";
import { auth } from "../../middlewares/auth";

const router = Router();

router.get("/:username", auth, profileController.getProfile);
router.get("/:username/tasks", auth, profileController.getTasks);
router.post("/", auth, profileController.create);

export { router };
