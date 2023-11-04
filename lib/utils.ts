import prisma from './prisma'

interface Task {
  id?: number
  name: string
  status: string
  timeCost: number
}

interface Worker {
  total: number
  status: string
  todo: Task[]
  running: Task[]
  done: Task[]
  concurrency: number
  runNext: () => boolean
  jobPromise: (nextJob: Task) => Promise<void>
  executeJob: (nextJob: Task) => Promise<void>
  run: () => Promise<void>
}

function worker(tasks: Task[] = [], concurrentCount: number = 1, workerId: number): Worker {
  const worker: Worker = {
    total: tasks.length,
    status: 'pending',
    todo: tasks,
    running: [],
    done: [],
    concurrency: concurrentCount,
    runNext: function () {
      return (this.running.length < this.concurrency) && (this.todo.length > 0)
    },
    jobPromise: function (nextJob) {
      return new Promise((resolve) => {
        setTimeout(async () => {
          const completedJobIndex = this.running.indexOf(nextJob)
          if (completedJobIndex !== -1) {
            const completedJob = this.running.splice(completedJobIndex, 1)
            this.done.push(completedJob[0])
            await prisma.task.update({
              where: { id: completedJob[0].id },
              data: { status: 'done' },
            })
            resolve()
          }
        }, nextJob.timeCost * 1000)
      })
    },
    executeJob: async function (nextJob) {
      await this.jobPromise(nextJob)
      await this.run()
    },
    run: async function () {
      while (this.runNext()) {
        const nextJob = this.todo.shift()
        if (nextJob) {
          this.running.push(nextJob)
          await prisma.task.update({
            where: { id: nextJob.id },
            data: { status: 'running' },
          })
          await prisma.worker.update({
            where: { id: workerId },
            data: { status: 'running' },
          })
          this.executeJob(nextJob)
        }
      }
      if (this.done.length === this.total) {
        this.status = 'done'
        await prisma.worker.update({
          where: { id: workerId },
          data: { status: 'done' },
        })
      }      
    }
  }
  return worker
}

class WorkerManager {

  async createWorker(concurrency: number = 1) {
    await prisma.worker.create({
      data: {
        concurrency: concurrency,
      },
    })
  }

  async createTask(workerId: number, task: Task) {
    await prisma.task.create({
      data: {
        name: task.name,
        status: task.status,
        timeCost: task.timeCost,
        workerId: workerId,
      },
    })
  }

  async deleteWorker(workerId: number) {
    await prisma.worker.delete({
      where: {
        id: workerId,
      },
      include: {
        tasks: true,
      },
    })
  }

  async getAllWorkers() {
    const workersFromDB = await prisma.worker.findMany({
      include: { tasks: true },
    })

    return workersFromDB
  }

  async runWorker(workerId: number) {
    const workerFromDB = await prisma.worker.findUnique({
      where: { id: workerId },
      include: { tasks: 
        {
          where: {
            status: 'pending',
          },
        }
      },
    })

    let runResult = { status: 'pending' }


    if (workerFromDB) {
      const newWorker = worker(workerFromDB.tasks, workerFromDB.concurrency, workerId)
      await newWorker.run()
    }
    return runResult
  }
}

export const workerManager = new WorkerManager()