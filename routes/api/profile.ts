import { Router } from "express";
import * as profileController from "../../controllers/profile";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/", auth, profileController.create);

export { router };
