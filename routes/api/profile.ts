import { Router } from "express";
import * as profileController from "../../controllers/profile";
import { auth } from "../../middlewares/auth";

const router = Router();

router.get("/:username", auth, profileController.getProfile);
router.post("/", auth, profileController.create);

export { router };
