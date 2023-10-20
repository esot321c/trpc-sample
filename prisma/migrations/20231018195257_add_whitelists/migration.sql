/*
  Warnings:

  - You are about to drop the column `linkedin` on the `Socials` table. All the data in the column will be lost.
  - You are about to drop the column `whitelists` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Made the column `is_admin` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "blockchains" TEXT[],
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Socials" DROP COLUMN "linkedin";

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "whitelists",
ALTER COLUMN "is_admin" SET NOT NULL;

-- CreateTable
CREATE TABLE "Whitelist" (
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
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "Whitelist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhitelistSignup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount_requested" TEXT NOT NULL,
    "notes" TEXT,
    "whitelist_slug" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "WhitelistSignup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Whitelist_name_key" ON "Whitelist"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Whitelist_slug_key" ON "Whitelist"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Whitelist_project_id_key" ON "Whitelist"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- AddForeignKey
ALTER TABLE "Whitelist" ADD CONSTRAINT "Whitelist_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhitelistSignup" ADD CONSTRAINT "WhitelistSignup_whitelist_slug_fkey" FOREIGN KEY ("whitelist_slug") REFERENCES "Whitelist"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhitelistSignup" ADD CONSTRAINT "WhitelistSignup_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
