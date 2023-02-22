import prisma from "../config/prisma";
import { Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

async function createTask(req: Request, res: Response) {
  try {
    const task = await prisma.task.create({ data: req.body });

    const {
      id,
      name,
      skill,
      frequency_type,
      streak,
      num_completed,
      daily_freq,
      weekly_freq,
    } = task;

    let condensedTask: Task = {
      id,
      name,
      skill,
      frequency_type,
      streak,
      num_completed,
    };

    if (task.frequency_type === "DAILY") {
      (condensedTask as DailyTask).daily_freq = daily_freq;
    } else if (task.frequency_type === "WEEKLY") {
      (condensedTask as WeeklyTask).weekly_freq = weekly_freq;
    }

    res.status(200).json(condensedTask);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.status(500).json({ message: error.message, meta: error.meta });
    } else {
      res
        .status(500)
        .json(new Error("Something went wrong while creating a task."));
    }
  }
}

export { createTask };
