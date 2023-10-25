-- CreateTable
CREATE TABLE "stakepool_history" (
    "id" SERIAL NOT NULL,
    "epoch" INTEGER NOT NULL,
    "blocks" INTEGER NOT NULL,
    "active_stake" TEXT NOT NULL,
    "active_size" DOUBLE PRECISION NOT NULL,
    "delegators_count" INTEGER NOT NULL,
    "rewards" TEXT NOT NULL,
    "fees" TEXT NOT NULL,
    "pool_id" TEXT NOT NULL,

    CONSTRAINT "stakepool_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "stakepool_history_epoch_pool_id_idx" ON "stakepool_history"("epoch", "pool_id");

-- AddForeignKey
ALTER TABLE "stakepool_history" ADD CONSTRAINT "stakepool_history_pool_id_fkey" FOREIGN KEY ("pool_id") REFERENCES "stakepools"("pool_id") ON DELETE CASCADE ON UPDATE CASCADE;
