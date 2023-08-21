/*
  Warnings:

  - You are about to drop the column `state` on the `orgs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uf` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "state",
ADD COLUMN     "uf" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orgs_phone_key" ON "orgs"("phone");
