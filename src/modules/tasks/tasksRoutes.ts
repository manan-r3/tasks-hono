// tasks routes

import { createRoute, z } from "@hono/zod-openapi";

// get all tasks
const getTasks = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.array(
            z.object({
              id: z.number(),
              name: z.string(),
            })
          ),
        },
      },
      description: "get all tasks",
    },
  },
});

// get task by id
const getTaskById = createRoute({
  method: "get",
  path: "/{id}",
  request: {
    params: z.object({
      id: z
        .string()
        .min(1)
        .openapi({
          param: {
            name: "id",
            in: "path",
          },
          example: "1",
        }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            id: z.number(),
            name: z.string(),
          }),
        },
      },
      description: "get specific tasks",
    },
    404: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: "task not found",
    },
  },
});

// create task
const createTask = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            name: z.string().min(4),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: z.object({
            id: z.number(),
            name: z.string(),
          }),
        },
      },
      description: "task created",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: "task not created",
    },
  },
});

//update tasks
const updateTask = createRoute({
  method: "put",
  path: "/{id}",
  request: {
    params: z.object({
      id: z
        .string()
        .min(1)
        .openapi({
          param: {
            name: "id",
            in: "path",
          },
          example: "1",
        }),
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            name: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            id: z.number(),
            name: z.string(),
          }),
        },
      },
      description: "task updated",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: "task not found",
    },
  },
});

// delete task
const deleteTask = createRoute({
  method: "delete",
  path: "/{id}",
  request: {
    params: z.object({
      id: z
        .string()
        .min(1)
        .openapi({
          param: {
            name: "id",
            in: "path",
          },
          example: "1",
        }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: "task deleted",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: "Internal Server Error",
    },
  },
});

export { getTasks, getTaskById, createTask, updateTask, deleteTask };
