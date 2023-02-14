import { Router } from "express";
import * as profileController from "../../controllers/profile";

const router = Router();

router.post("/", profileController.create);

export { router };
