/*
  Warnings:

  - You are about to drop the column `queueId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `Queue` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workerId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_queueId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "queueId",
ADD COLUMN     "workerId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Queue";

-- CreateTable
CREATE TABLE "Worker" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "concurrency" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
