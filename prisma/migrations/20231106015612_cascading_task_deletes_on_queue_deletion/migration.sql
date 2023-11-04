-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_queueId_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_queueId_fkey" FOREIGN KEY ("queueId") REFERENCES "Queue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
