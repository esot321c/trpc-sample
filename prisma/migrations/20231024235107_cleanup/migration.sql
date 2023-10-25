-- DropForeignKey
ALTER TABLE "fiso_approved_stake_pools" DROP CONSTRAINT "fiso_approved_stake_pools_fiso_id_fkey";

-- DropForeignKey
ALTER TABLE "fiso_approved_stake_pools" DROP CONSTRAINT "fiso_approved_stake_pools_pool_id_fkey";

-- AddForeignKey
ALTER TABLE "fiso_approved_stake_pools" ADD CONSTRAINT "fiso_approved_stake_pools_fiso_id_fkey" FOREIGN KEY ("fiso_id") REFERENCES "fisos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fiso_approved_stake_pools" ADD CONSTRAINT "fiso_approved_stake_pools_pool_id_fkey" FOREIGN KEY ("pool_id") REFERENCES "stakepools"("pool_id") ON DELETE CASCADE ON UPDATE CASCADE;
