-- CreateTable
CREATE TABLE "user_stake_history" (
    "id" SERIAL NOT NULL,
    "active_epoch" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "pool_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "user_stake_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_stake_history_active_epoch_user_id_idx" ON "user_stake_history"("active_epoch", "user_id");

-- AddForeignKey
ALTER TABLE "user_stake_history" ADD CONSTRAINT "user_stake_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
