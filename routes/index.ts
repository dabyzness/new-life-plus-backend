import { Router, Request, Response } from "express";
import prisma from "../config/prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findFirst({ where: { username: "halal" } });
  res.json(users);
});

export { router };
