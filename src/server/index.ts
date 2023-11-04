import { publicProcedure, router } from "./trpc"
import { z } from "zod"
import { workerManager } from "../../lib/utils"

export const appRouter = router({
  getAllWorkers: publicProcedure.query(async () => {
    return await workerManager.getAllWorkers()
  }),

  createWorker: publicProcedure.input(z.number()).mutation(async ({ input }) => {
    const concurrency = input
    await workerManager.createWorker(concurrency)
  }),
  
  deleteWorker: publicProcedure.input(z.number()).mutation(async ({ input }) => {
    await workerManager.deleteWorker(input)
  }),
  
  runWorker: publicProcedure.input(z.number()).mutation(async ({ input }) => {
    const runResult = await workerManager.runWorker(input)
    return runResult
  }),
  
  createTask: publicProcedure.input(z.object({
    workerId: z.number(),
    task: z.object({
      name: z.string(),
      status: z.string(),
      timeCost: z.number(),
    })
  })).mutation(async ({ input }) => {
    await workerManager.createTask(input.workerId, input.task)
  }),
})

export type AppRouter = typeof appRouter