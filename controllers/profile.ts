import { Request, Response } from "express";

import prisma from "../config/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { exclude } from "../helpers/prismaHelper";

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

async function getProfile(req: Request, res: Response) {
  try {
    const { username } = req.params;
    const profile = await prisma.profile.findFirst({
      where: { username },
    });

    if (!profile) {
      throw new Error("Profile does not exist");
    }

    const profileWithoutTimestamps = exclude(profile, [
      "created_at",
      "updated_at",
    ]);

    res.status(200).json(profileWithoutTimestamps);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export { createProfile as create, getProfile };
