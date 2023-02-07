import { Request, Response } from "express";
import bcrypt from "bcrypt";
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
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new Error(`Email is incorrect`);
    }

    const isMatch: boolean = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      throw new Error(`Password is incorrect`);
    }
    res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
}
