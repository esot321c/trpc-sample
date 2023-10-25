/*
  Warnings:

  - You are about to drop the column `fiso_pool_ids` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "fiso_pool_ids";

-- CreateTable
CREATE TABLE "fisos" (
    "id" SERIAL NOT NULL,
    "token_amount" INTEGER NOT NULL,
    "token_name" TEXT NOT NULL,
    "token_ticker" TEXT NOT NULL,
    "start_epoch" INTEGER NOT NULL,
    "end_epoch" INTEGER NOT NULL,
    "project_slug" TEXT NOT NULL,

    CONSTRAINT "fisos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fiso_stake_pools" (
    "id" SERIAL NOT NULL,
    "start_epoch" INTEGER NOT NULL,
    "end_epoch" INTEGER NOT NULL,
    "fiso_id" INTEGER NOT NULL,
    "pool_id" TEXT NOT NULL,

    CONSTRAINT "fiso_stake_pools_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fisos" ADD CONSTRAINT "fisos_project_slug_fkey" FOREIGN KEY ("project_slug") REFERENCES "projects"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fiso_stake_pools" ADD CONSTRAINT "fiso_stake_pools_fiso_id_fkey" FOREIGN KEY ("fiso_id") REFERENCES "fisos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fiso_stake_pools" ADD CONSTRAINT "fiso_stake_pools_pool_id_fkey" FOREIGN KEY ("pool_id") REFERENCES "stakepools"("pool_id") ON DELETE RESTRICT ON UPDATE CASCADE;
