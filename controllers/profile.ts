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

async function getTasks(req: Request, res: Response) {
  try {
    const { username } = req.params;
    if (!username) {
      throw new Error("No username provided.");
    }

    if (username !== req.token?.username) {
      throw new Error(
        "Permission denied. Cannot access tasks of another user."
      );
    }

    const profile = await prisma.profile.findFirst({ where: { username } });

    if (!profile) {
      throw new Error("Profile does not exist.");
    }

    // Shortern this function. Create a helper function for queries so that I don't need these long ugly queries
    const tasks: Task[] = await Promise.all([
      prisma.task.findMany({
        where: { profile_id: profile.id, frequency_type: "DAILY" },
        select: {
          id: true,
          name: true,
          skill: true,
          frequency_type: true,
          streak: true,
          num_completed: true,
          daily_freq: true,
        },
      }),
      prisma.task.findMany({
        where: { profile_id: profile.id, frequency_type: "WEEKLY" },
        select: {
          id: true,
          name: true,
          skill: true,
          frequency_type: true,
          streak: true,
          num_completed: true,
          weekly_freq: true,
        },
      }),
      prisma.task.findMany({
        where: { profile_id: profile.id, frequency_type: "MONTHLY" },
        select: {
          id: true,
          name: true,
          skill: true,
          frequency_type: true,
          streak: true,
          num_completed: true,
        },
      }),
    ]).then((value) => value.flat());

    console.log(`Test: `, tasks);

    res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export { createProfile as create, getProfile, getTasks };
