/*
  Warnings:

  - You are about to drop the column `email` on the `spo_signups` table. All the data in the column will be lost.
  - You are about to drop the column `email_verified` on the `spo_signups` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `spo_signups` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `spo_signups` table. All the data in the column will be lost.
  - You are about to drop the column `signups` on the `spo_signups` table. All the data in the column will be lost.
  - You are about to drop the `fiso_stake_pools` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pool_id` to the `spo_signups` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "fiso_stake_pools" DROP CONSTRAINT "fiso_stake_pools_fiso_id_fkey";

-- DropForeignKey
ALTER TABLE "fiso_stake_pools" DROP CONSTRAINT "fiso_stake_pools_pool_id_fkey";

-- DropIndex
DROP INDEX "spo_signups_email_key";

-- AlterTable
ALTER TABLE "spo_signups" DROP COLUMN "email",
DROP COLUMN "email_verified",
DROP COLUMN "image",
DROP COLUMN "name",
DROP COLUMN "signups",
ADD COLUMN     "operator_discord" TEXT,
ADD COLUMN     "operator_email" TEXT,
ADD COLUMN     "operator_name" TEXT,
ADD COLUMN     "operator_telegram" TEXT,
ADD COLUMN     "operator_twitter" TEXT,
ADD COLUMN     "pool_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "fiso_stake_pools";

-- CreateTable
CREATE TABLE "fiso_approved_stake_pools" (
    "id" SERIAL NOT NULL,
    "start_epoch" INTEGER NOT NULL,
    "end_epoch" INTEGER NOT NULL,
    "fiso_id" INTEGER NOT NULL,
    "pool_id" TEXT NOT NULL,

    CONSTRAINT "fiso_approved_stake_pools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FisoToSpoSignups" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FisoToSpoSignups_AB_unique" ON "_FisoToSpoSignups"("A", "B");

-- CreateIndex
CREATE INDEX "_FisoToSpoSignups_B_index" ON "_FisoToSpoSignups"("B");

-- AddForeignKey
ALTER TABLE "fiso_approved_stake_pools" ADD CONSTRAINT "fiso_approved_stake_pools_fiso_id_fkey" FOREIGN KEY ("fiso_id") REFERENCES "fisos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fiso_approved_stake_pools" ADD CONSTRAINT "fiso_approved_stake_pools_pool_id_fkey" FOREIGN KEY ("pool_id") REFERENCES "stakepools"("pool_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spo_signups" ADD CONSTRAINT "spo_signups_pool_id_fkey" FOREIGN KEY ("pool_id") REFERENCES "stakepools"("pool_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FisoToSpoSignups" ADD CONSTRAINT "_FisoToSpoSignups_A_fkey" FOREIGN KEY ("A") REFERENCES "fisos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FisoToSpoSignups" ADD CONSTRAINT "_FisoToSpoSignups_B_fkey" FOREIGN KEY ("B") REFERENCES "spo_signups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
