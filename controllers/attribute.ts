import { Request, Response } from "express";
import prisma from "../config/prisma";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime";

function getProfileStats(req: Request, res: Response) {
  // console.log(req.token);
  // console.log(req.token?.id);
}

export { getProfileStats };
