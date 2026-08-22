-- CreateTable
CREATE TABLE "SiteSetting" (
    "key" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "posterUrl" TEXT,
    "storageDriver" "StorageDriver" NOT NULL DEFAULT 'public_asset',
    "cloudinaryPublicId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("key")
);
