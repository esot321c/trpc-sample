/*
  Warnings:

  - A unique constraint covering the columns `[active_epoch,user_reward_address,pool_id]` on the table `user_stake_history` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_stake_history_active_epoch_user_reward_address_idx";

-- CreateIndex
CREATE INDEX "user_stake_history_active_epoch_user_reward_address_pool_id_idx" ON "user_stake_history"("active_epoch", "user_reward_address", "pool_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_stake_history_active_epoch_user_reward_address_pool_id_key" ON "user_stake_history"("active_epoch", "user_reward_address", "pool_id");
