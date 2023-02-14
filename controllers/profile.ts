import { Request, Response } from "express";

import prisma from "../config/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

async function createProfile(req: Request, res: Response) {
  try {
    const profile = await prisma.profile.create({ data: req.body });

    res.status(200).json({ profile });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.status(500).json({ message: error.message, meta: error.meta });
    } else {
      res
        .status(500)
        .json(new Error("Something went wrong while creating your profile."));
    }
  }
}

export { createProfile as create };
