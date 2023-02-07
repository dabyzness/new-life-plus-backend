import { Router, Request, Response } from "express";
import prisma from "../config/prisma";
import * as authController from "../controllers/auth";
import { encryptPassword } from "../middlewares/auth";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findFirst({ where: { username: "Harambe" } });
  res.json(users);
});

router.post("/register", encryptPassword, authController.register);
router.post("/login", authController.login);

export { router };
