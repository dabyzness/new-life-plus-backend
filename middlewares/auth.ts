import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const saltRounds = 12;

export const SECRET_KEY: Secret = "dfhluiewbjkvcskjaiuewhgrf";

export interface JwtPayloadUser extends JwtPayload {
  id: number;
  username: string;
}

// export interface CustomRequest extends Request {
//   token: JwtPayloadUser;
// }

// JWT token check
export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Unauthorized access");
    }

    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayloadUser;

    req.token = decoded;

    next();
  } catch (err) {
    res.status(401).send(err);
  }
}

// Password Encryption
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
