/*
  Warnings:

  - You are about to drop the column `activeSize` on the `stakepool_stats` table. All the data in the column will be lost.
  - You are about to drop the column `activeStake` on the `stakepool_stats` table. All the data in the column will be lost.
  - You are about to drop the column `blocksEpoch` on the `stakepool_stats` table. All the data in the column will be lost.
  - You are about to drop the column `blocksMinted` on the `stakepool_stats` table. All the data in the column will be lost.
  - You are about to drop the column `declaredPledge` on the `stakepool_stats` table. All the data in the column will be lost.
  - You are about to drop the column `fixedCost` on the `stakepool_stats` table. All the data in the column will be lost.
  - You are about to drop the column `liveDelegators` on the `stakepool_stats` table. All the data in the column will be lost.
  - You are about to drop the column `livePledge` on the `stakepool_stats` table. All the data in the column will be lost.
  - You are about to drop the column `liveSaturation` on the `stakepool_stats` table. All the data in the column will be lost.
  - You are about to drop the column `liveSize` on the `stakepool_stats` table. All the data in the column will be lost.
  - You are about to drop the column `liveStake` on the `stakepool_stats` table. All the data in the column will be lost.
  - You are about to drop the column `marginCost` on the `stakepool_stats` table. All the data in the column will be lost.
  - You are about to drop the column `poolId` on the `stakepool_stats` table. All the data in the column will be lost.
  - You are about to drop the column `rewardAccount` on the `stakepool_stats` table. All the data in the column will be lost.
  - You are about to drop the column `vrfKey` on the `stakepool_stats` table. All the data in the column will be lost.
  - You are about to drop the column `poolId` on the `stakepools` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pool_id]` on the table `stakepool_stats` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pool_id]` on the table `stakepools` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `active_size` to the `stakepool_stats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `active_stake` to the `stakepool_stats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blocks_epoch` to the `stakepool_stats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blocks_minted` to the `stakepool_stats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `declared_pledge` to the `stakepool_stats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fixed_cost` to the `stakepool_stats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `live_delegators` to the `stakepool_stats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `live_pledge` to the `stakepool_stats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `live_saturation` to the `stakepool_stats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `live_size` to the `stakepool_stats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `live_stake` to the `stakepool_stats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `margin_cost` to the `stakepool_stats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pool_id` to the `stakepool_stats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reward_account` to the `stakepool_stats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vrf_key` to the `stakepool_stats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pool_id` to the `stakepools` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "stakepool_stats" DROP CONSTRAINT "stakepool_stats_poolId_fkey";

-- DropIndex
DROP INDEX "stakepool_stats_poolId_key";

-- DropIndex
DROP INDEX "stakepools_poolId_key";

-- AlterTable
ALTER TABLE "stakepool_stats" DROP COLUMN "activeSize",
DROP COLUMN "activeStake",
DROP COLUMN "blocksEpoch",
DROP COLUMN "blocksMinted",
DROP COLUMN "declaredPledge",
DROP COLUMN "fixedCost",
DROP COLUMN "liveDelegators",
DROP COLUMN "livePledge",
DROP COLUMN "liveSaturation",
DROP COLUMN "liveSize",
DROP COLUMN "liveStake",
DROP COLUMN "marginCost",
DROP COLUMN "poolId",
DROP COLUMN "rewardAccount",
DROP COLUMN "vrfKey",
ADD COLUMN     "active_size" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "active_stake" TEXT NOT NULL,
ADD COLUMN     "blocks_epoch" INTEGER NOT NULL,
ADD COLUMN     "blocks_minted" INTEGER NOT NULL,
ADD COLUMN     "declared_pledge" TEXT NOT NULL,
ADD COLUMN     "fixed_cost" TEXT NOT NULL,
ADD COLUMN     "live_delegators" INTEGER NOT NULL,
ADD COLUMN     "live_pledge" TEXT NOT NULL,
ADD COLUMN     "live_saturation" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "live_size" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "live_stake" TEXT NOT NULL,
ADD COLUMN     "margin_cost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pool_id" TEXT NOT NULL,
ADD COLUMN     "reward_account" TEXT NOT NULL,
ADD COLUMN     "vrf_key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "stakepools" DROP COLUMN "poolId",
ADD COLUMN     "pool_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "stakepool_stats_pool_id_key" ON "stakepool_stats"("pool_id");

-- CreateIndex
CREATE UNIQUE INDEX "stakepools_pool_id_key" ON "stakepools"("pool_id");

-- AddForeignKey
ALTER TABLE "stakepool_stats" ADD CONSTRAINT "stakepool_stats_pool_id_fkey" FOREIGN KEY ("pool_id") REFERENCES "stakepools"("pool_id") ON DELETE CASCADE ON UPDATE CASCADE;
