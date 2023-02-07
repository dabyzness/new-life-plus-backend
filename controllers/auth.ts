import { Request, Response } from "express";
import prisma from "../config/prisma";

export async function register(req: Request, res: Response) {
  try {
    const user = await prisma.user.create({ data: req.body });
    res.status(200).send(`${user.email} was registered successfully!`);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function login(req: Request, res: Response) {
  try {
    const user = await prisma.user.findFirst({ where: req.body });
    res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
}
