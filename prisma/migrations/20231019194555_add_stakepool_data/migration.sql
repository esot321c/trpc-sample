-- CreateTable
CREATE TABLE "stakepools" (
    "id" SERIAL NOT NULL,
    "poolId" TEXT NOT NULL,
    "hex" TEXT,
    "url" TEXT,
    "hash" TEXT,
    "ticker" TEXT,
    "name" TEXT,
    "description" TEXT,
    "homepage" TEXT,

    CONSTRAINT "stakepools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pools" (
    "id" SERIAL NOT NULL,
    "poolId" TEXT NOT NULL,
    "hex" TEXT NOT NULL,
    "vrfKey" TEXT NOT NULL,
    "blocksMinted" INTEGER NOT NULL,
    "blocksEpoch" INTEGER NOT NULL,
    "liveStake" TEXT NOT NULL,
    "liveSize" DOUBLE PRECISION NOT NULL,
    "liveSaturation" DOUBLE PRECISION NOT NULL,
    "liveDelegators" INTEGER NOT NULL,
    "activeStake" TEXT NOT NULL,
    "activeSize" DOUBLE PRECISION NOT NULL,
    "declaredPledge" TEXT NOT NULL,
    "livePledge" TEXT NOT NULL,
    "marginCost" DOUBLE PRECISION NOT NULL,
    "fixedCost" TEXT NOT NULL,
    "rewardAccount" TEXT NOT NULL,
    "owners" TEXT[],
    "registration" TEXT[],
    "retirement" TEXT[],

    CONSTRAINT "pools_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stakepools_poolId_key" ON "stakepools"("poolId");

-- CreateIndex
CREATE UNIQUE INDEX "pools_poolId_key" ON "pools"("poolId");

-- AddForeignKey
ALTER TABLE "pools" ADD CONSTRAINT "pools_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "stakepools"("poolId") ON DELETE CASCADE ON UPDATE CASCADE;
