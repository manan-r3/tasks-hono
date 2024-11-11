import { OpenAPIHono } from "@hono/zod-openapi";
import prisma from "../../utils/database.js";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "./tasksRoutes.js";

const tasksHandler = new OpenAPIHono();

tasksHandler.openapi(getTasks, async (c) => {
  const tasks = await prisma.task.findMany();
  return c.json(tasks, 200);
});

tasksHandler.openapi(getTaskById, async (c) => {
  const { id } = c.req.param();
  const task = await prisma.task.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!task) {
    return c.json({ message: "Task not found" }, 404);
  }
  return c.json(task, 200);
});

tasksHandler.openapi(createTask, async (c) => {
  const body = await c.req.json();
  const task = await prisma.task.create({
    data: body,
  });
  if (!task) {
    return c.json({ message: "Task not created" }, 500);
  }
  return c.json(task, 201);
});

tasksHandler.openapi(updateTask, async (c) => {
  const { id } = c.req.param();
  const body = await c.req.json();
  const task = await prisma.task.update({
    where: {
      id: Number(id),
    },
    data: body,
  });
  if (!task) {
    return c.json({ message: "Task not updated" }, 500);
  }
  return c.json(task, 200);
});

tasksHandler.openapi(deleteTask, async (c) => {
  const { id } = c.req.param();
  const task = await prisma.task.delete({
    where: {
      id: Number(id),
    },
  });
  if (!task) {
    return c.json({ message: "Task not deleted" }, 500);
  }
  return c.json({ message: "Task deleted" }, 200);
});

export default tasksHandler;
