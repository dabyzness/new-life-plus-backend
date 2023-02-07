import { Router, Request, Response } from "express";
import prisma from "../config/prisma";
import * as authController from "../controllers/auth";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findFirst({ where: { username: "halal" } });
  res.json(users);
});

router.post("/register", authController.register);
router.post("/login", authController.login);

export { router };
