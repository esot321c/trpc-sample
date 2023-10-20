/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Roadmap` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Socials` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tokenomic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tokenomics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Whitelist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WhitelistSignup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pools` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `spos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Roadmap" DROP CONSTRAINT "Roadmap_project_slug_fkey";

-- DropForeignKey
ALTER TABLE "Socials" DROP CONSTRAINT "Socials_project_slug_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_project_slug_fkey";

-- DropForeignKey
ALTER TABLE "Tokenomic" DROP CONSTRAINT "Tokenomic_tokenomicsId_fkey";

-- DropForeignKey
ALTER TABLE "Tokenomics" DROP CONSTRAINT "Tokenomics_project_slug_fkey";

-- DropForeignKey
ALTER TABLE "Whitelist" DROP CONSTRAINT "Whitelist_project_slug_fkey";

-- DropForeignKey
ALTER TABLE "WhitelistSignup" DROP CONSTRAINT "WhitelistSignup_user_id_fkey";

-- DropForeignKey
ALTER TABLE "WhitelistSignup" DROP CONSTRAINT "WhitelistSignup_whitelist_slug_fkey";

-- DropForeignKey
ALTER TABLE "pools" DROP CONSTRAINT "pools_poolId_fkey";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "Roadmap";

-- DropTable
DROP TABLE "Socials";

-- DropTable
DROP TABLE "Team";

-- DropTable
DROP TABLE "Tokenomic";

-- DropTable
DROP TABLE "Tokenomics";

-- DropTable
DROP TABLE "Whitelist";

-- DropTable
DROP TABLE "WhitelistSignup";

-- DropTable
DROP TABLE "pools";

-- DropTable
DROP TABLE "spos";

-- CreateTable
CREATE TABLE "spo_signups" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "signups" TEXT[],

    CONSTRAINT "spo_signups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stakepool_stats" (
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

    CONSTRAINT "stakepool_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "whitepaper_link" TEXT,
    "description" TEXT NOT NULL,
    "blockchains" TEXT[],
    "funds_raised" INTEGER,
    "banner_img_url" TEXT NOT NULL,
    "avatar_img_url" TEXT NOT NULL,
    "is_launched" BOOLEAN NOT NULL,
    "is_draft" BOOLEAN NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_socials" (
    "id" SERIAL NOT NULL,
    "telegram" TEXT,
    "twitter" TEXT,
    "discord" TEXT,
    "github" TEXT,
    "website" TEXT,
    "project_slug" TEXT NOT NULL,

    CONSTRAINT "project_socials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_roadmaps" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "project_slug" TEXT NOT NULL,

    CONSTRAINT "project_roadmaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "profile_img_url" TEXT,
    "twitter" TEXT,
    "linkedin" TEXT,
    "project_slug" TEXT NOT NULL,

    CONSTRAINT "project_team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_tokenomics" (
    "id" SERIAL NOT NULL,
    "token_name" TEXT NOT NULL,
    "total_tokens" INTEGER NOT NULL,
    "token_ticker" TEXT NOT NULL,
    "project_slug" TEXT NOT NULL,

    CONSTRAINT "project_tokenomics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_tokenomics_items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "value" TEXT,
    "tge" TEXT,
    "freq" TEXT,
    "length" TEXT,
    "lockup" TEXT,
    "tokenomicsId" INTEGER NOT NULL,

    CONSTRAINT "project_tokenomics_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whitelists" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "start_date_time" TIMESTAMP(3) NOT NULL,
    "end_date_time" TIMESTAMP(3) NOT NULL,
    "max_per_signup" INTEGER,
    "hard_cap" INTEGER,
    "external_link" TEXT,
    "project_slug" TEXT NOT NULL,

    CONSTRAINT "whitelists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whitelist_signups" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "amount_requested" TEXT NOT NULL,
    "amount_approved" TEXT,
    "status" TEXT,
    "notes" TEXT,
    "whitelist_slug" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "whitelist_signups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "spo_signups_email_key" ON "spo_signups"("email");

-- CreateIndex
CREATE UNIQUE INDEX "stakepool_stats_poolId_key" ON "stakepool_stats"("poolId");

-- CreateIndex
CREATE UNIQUE INDEX "projects_name_key" ON "projects"("name");

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "project_socials_project_slug_key" ON "project_socials"("project_slug");

-- CreateIndex
CREATE UNIQUE INDEX "project_tokenomics_project_slug_key" ON "project_tokenomics"("project_slug");

-- CreateIndex
CREATE UNIQUE INDEX "whitelists_name_key" ON "whitelists"("name");

-- CreateIndex
CREATE UNIQUE INDEX "whitelists_slug_key" ON "whitelists"("slug");

-- AddForeignKey
ALTER TABLE "stakepool_stats" ADD CONSTRAINT "stakepool_stats_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "stakepools"("poolId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_socials" ADD CONSTRAINT "project_socials_project_slug_fkey" FOREIGN KEY ("project_slug") REFERENCES "projects"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_roadmaps" ADD CONSTRAINT "project_roadmaps_project_slug_fkey" FOREIGN KEY ("project_slug") REFERENCES "projects"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_team" ADD CONSTRAINT "project_team_project_slug_fkey" FOREIGN KEY ("project_slug") REFERENCES "projects"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_tokenomics" ADD CONSTRAINT "project_tokenomics_project_slug_fkey" FOREIGN KEY ("project_slug") REFERENCES "projects"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_tokenomics_items" ADD CONSTRAINT "project_tokenomics_items_tokenomicsId_fkey" FOREIGN KEY ("tokenomicsId") REFERENCES "project_tokenomics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whitelists" ADD CONSTRAINT "whitelists_project_slug_fkey" FOREIGN KEY ("project_slug") REFERENCES "projects"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whitelist_signups" ADD CONSTRAINT "whitelist_signups_whitelist_slug_fkey" FOREIGN KEY ("whitelist_slug") REFERENCES "whitelists"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whitelist_signups" ADD CONSTRAINT "whitelist_signups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
