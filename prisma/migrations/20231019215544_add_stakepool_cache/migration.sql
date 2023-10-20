-- CreateTable
CREATE TABLE "stakepool_cache" (
    "id" SERIAL NOT NULL,
    "spoListKey" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stakepool_cache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stakepool_cache_spoListKey_key" ON "stakepool_cache"("spoListKey");
