-- DropIndex
DROP INDEX "Topic_categotySlug_key";

-- DropIndex
DROP INDEX "Topic_coverImageUrl_key";

-- AlterTable
ALTER TABLE "Topic" ALTER COLUMN "coverImageUrl" DROP NOT NULL,
ALTER COLUMN "likes" DROP NOT NULL,
ALTER COLUMN "likes" SET DEFAULT 0,
ALTER COLUMN "viwes" DROP NOT NULL,
ALTER COLUMN "viwes" SET DEFAULT 0;
