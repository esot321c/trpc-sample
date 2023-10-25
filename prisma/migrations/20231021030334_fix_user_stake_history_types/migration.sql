/*
  Warnings:

  - You are about to drop the column `user_id` on the `user_stake_history` table. All the data in the column will be lost.
  - Added the required column `user_reward_address` to the `user_stake_history` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_stake_history" DROP CONSTRAINT "user_stake_history_user_id_fkey";

-- DropIndex
DROP INDEX "user_stake_history_active_epoch_user_id_idx";

-- AlterTable
ALTER TABLE "user_stake_history" DROP COLUMN "user_id",
ADD COLUMN     "user_reward_address" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "user_stake_history_active_epoch_user_reward_address_idx" ON "user_stake_history"("active_epoch", "user_reward_address");

-- AddForeignKey
ALTER TABLE "user_stake_history" ADD CONSTRAINT "user_stake_history_user_reward_address_fkey" FOREIGN KEY ("user_reward_address") REFERENCES "users"("reward_address") ON DELETE CASCADE ON UPDATE CASCADE;
