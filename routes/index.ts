import { Router } from "express";
import * as authController from "../controllers/auth";
import { encryptPassword } from "../middlewares/auth";

const router = Router();

router.post("/register", encryptPassword, authController.register);
router.post("/login", authController.login);

export { router };
