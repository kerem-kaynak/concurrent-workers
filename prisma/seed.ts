import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const worker1 = await prisma.worker.create({
    data: {
      concurrency: 2,
      tasks: {
        create: [
          {
            name: 'task3',
            status: 'pending',
            timeCost: 3,
          },
          {
            name: 'task10',
            status: 'pending',
            timeCost: 10,
          },
          {
            name: 'task5',
            status: 'pending',
            timeCost: 5,
          },
        ],
      },
    },
  })

  const worker2 = await prisma.worker.create({
    data: {
      concurrency: 3,
      tasks: {
        create: [
          {
            name: 'task3',
            status: 'pending',
            timeCost: 3,
          },
          {
            name: 'task10',
            status: 'pending',
            timeCost: 10,
          },
          {
            name: 'task5',
            status: 'pending',
            timeCost: 5,
          },
          {
            name: 'task15',
            status: 'pending',
            timeCost: 15,
          },
          {
            name: 'task8',
            status: 'pending',
            timeCost: 8,
          },
        ],
      },
    },
  })

  const worker3 = await prisma.worker.create({
    data: {
      concurrency: 5,
      tasks: {
        create: [
          {
            name: 'task3',
            status: 'pending',
            timeCost: 3,
          },
          {
            name: 'task10',
            status: 'pending',
            timeCost: 10,
          },
          {
            name: 'task5',
            status: 'pending',
            timeCost: 5,
          },
          {
            name: 'task15',
            status: 'pending',
            timeCost: 15,
          },
          {
            name: 'task12',
            status: 'pending',
            timeCost: 12,
          },          {
            name: 'task6',
            status: 'pending',
            timeCost: 6,
          },
          {
            name: 'task20',
            status: 'pending',
            timeCost: 20,
          },
          {
            name: 'task2',
            status: 'pending',
            timeCost: 2,
          },
          {
            name: 'task1',
            status: 'pending',
            timeCost: 1,
          },
          {
            name: 'task3',
            status: 'pending',
            timeCost: 3,
          },
        ],
      },
    },
  })
  console.log({ worker1, worker2, worker3 })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })