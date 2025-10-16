-- CreateTable
CREATE TABLE "Simulations" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "originUrl" TEXT NOT NULL,
    "inputData" JSONB NOT NULL,
    "resultData" JSONB NOT NULL,

    CONSTRAINT "Simulations_pkey" PRIMARY KEY ("id")
);
