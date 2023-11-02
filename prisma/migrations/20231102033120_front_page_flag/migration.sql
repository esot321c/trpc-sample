-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "front_page" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "is_launched" SET DEFAULT false,
ALTER COLUMN "is_draft" SET DEFAULT true;
