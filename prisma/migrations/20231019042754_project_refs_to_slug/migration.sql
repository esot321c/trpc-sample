/*
  Warnings:

  - You are about to drop the column `project_id` on the `Roadmap` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `Socials` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `Tokenomics` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `Whitelist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[project_slug]` on the table `Socials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[project_slug]` on the table `Tokenomics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `project_slug` to the `Roadmap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_slug` to the `Socials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_slug` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_slug` to the `Tokenomics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_slug` to the `Whitelist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Roadmap" DROP CONSTRAINT "Roadmap_project_id_fkey";

-- DropForeignKey
ALTER TABLE "Socials" DROP CONSTRAINT "Socials_project_id_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_project_id_fkey";

-- DropForeignKey
ALTER TABLE "Tokenomic" DROP CONSTRAINT "Tokenomic_tokenomicsId_fkey";

-- DropForeignKey
ALTER TABLE "Tokenomics" DROP CONSTRAINT "Tokenomics_project_id_fkey";

-- DropForeignKey
ALTER TABLE "Whitelist" DROP CONSTRAINT "Whitelist_project_id_fkey";

-- DropIndex
DROP INDEX "Socials_project_id_key";

-- DropIndex
DROP INDEX "Tokenomics_project_id_key";

-- AlterTable
ALTER TABLE "Roadmap" DROP COLUMN "project_id",
ADD COLUMN     "project_slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Socials" DROP COLUMN "project_id",
ADD COLUMN     "project_slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "project_id",
ADD COLUMN     "project_slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tokenomics" DROP COLUMN "project_id",
ADD COLUMN     "project_slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Whitelist" DROP COLUMN "project_id",
ADD COLUMN     "project_slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Socials_project_slug_key" ON "Socials"("project_slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tokenomics_project_slug_key" ON "Tokenomics"("project_slug");

-- AddForeignKey
ALTER TABLE "Socials" ADD CONSTRAINT "Socials_project_slug_fkey" FOREIGN KEY ("project_slug") REFERENCES "Project"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roadmap" ADD CONSTRAINT "Roadmap_project_slug_fkey" FOREIGN KEY ("project_slug") REFERENCES "Project"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_project_slug_fkey" FOREIGN KEY ("project_slug") REFERENCES "Project"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tokenomics" ADD CONSTRAINT "Tokenomics_project_slug_fkey" FOREIGN KEY ("project_slug") REFERENCES "Project"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tokenomic" ADD CONSTRAINT "Tokenomic_tokenomicsId_fkey" FOREIGN KEY ("tokenomicsId") REFERENCES "Tokenomics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Whitelist" ADD CONSTRAINT "Whitelist_project_slug_fkey" FOREIGN KEY ("project_slug") REFERENCES "Project"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
