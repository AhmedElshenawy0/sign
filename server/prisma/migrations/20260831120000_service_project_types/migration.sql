-- Map existing work, then replace ProjectType enum.
ALTER TABLE "Project" ALTER COLUMN "type" TYPE TEXT USING "type"::text;

UPDATE "Project" SET "type" = 'brand_identity' WHERE "type" IN ('logos', 'designs');

CREATE TYPE "ProjectType_new" AS ENUM (
  'brand_identity',
  'packaging',
  'prints',
  'social_media',
  'outdoors',
  'brand_strategy',
  'marketing_strategy',
  'photos',
  'videos',
  'nfc_card',
  'nfc_ring',
  'nfc_medal'
);

ALTER TABLE "Project" ALTER COLUMN "type" TYPE "ProjectType_new" USING "type"::"ProjectType_new";

DROP TYPE "ProjectType";

ALTER TYPE "ProjectType_new" RENAME TO "ProjectType";
