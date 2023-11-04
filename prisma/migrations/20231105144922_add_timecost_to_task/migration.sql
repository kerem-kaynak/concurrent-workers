/*
  Warnings:

  - Added the required column `timeCost` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "timeCost" INTEGER NOT NULL;
