import { Router } from "express";
import * as attributeController from "../../../controllers/attribute";
import { auth } from "../../../middlewares/auth";

const router = Router();

router.get("/attribute", auth, attributeController.getProfileStats);

export { router };
