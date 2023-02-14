import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../config/prisma";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../middlewares/auth";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime";

export async function register(req: Request, res: Response) {
  try {
    const user = await prisma.user.create({ data: req.body });

    const token = jwt.sign(
      { id: user.id.toString(), username: user.username },
      SECRET_KEY,
      { expiresIn: "2 days" }
    );

    res.status(200).json({ user, token });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError)
      return res.status(500).json({ message: err.message, meta: err.meta });
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

    const token = jwt.sign(
      { id: user.id.toString(), username: user.username },
      SECRET_KEY,
      { expiresIn: "2 days" }
    );

    res.status(200).send({
      user: { id: user.id.toString(), username: user.username },
      token: token,
    });
  } catch (err) {
    if (err instanceof PrismaClientInitializationError) {
      return res.status(500).send({ Error: "Could not connect to database." });
    }

    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
  }
}
