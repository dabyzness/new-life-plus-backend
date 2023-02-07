import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";

const saltRounds = 12;

export async function encryptPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  req.body.password = hashedPassword;
  next();
}
