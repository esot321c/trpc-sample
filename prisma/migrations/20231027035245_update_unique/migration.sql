/*
  Warnings:

  - A unique constraint covering the columns `[epoch,pool_id]` on the table `stakepool_history` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "stakepool_history_epoch_pool_id_key" ON "stakepool_history"("epoch", "pool_id");
