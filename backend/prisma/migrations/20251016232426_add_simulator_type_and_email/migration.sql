/*
  Warnings:

  - You are about to drop the `Simulations` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SimulatorType" AS ENUM ('AMORTIZACAO', 'JUROS_COMPOSTOS', 'EMPRESTIMO', 'INVESTIMENTOS');

-- DropTable
DROP TABLE "Simulations";

-- CreateTable
CREATE TABLE "simulations" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "simulatorType" "SimulatorType" NOT NULL,
    "email" TEXT,
    "inputData" JSONB NOT NULL,
    "outputData" JSONB NOT NULL,

    CONSTRAINT "simulations_pkey" PRIMARY KEY ("id")
);
