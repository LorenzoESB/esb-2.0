/*
  Warnings:

  - Added the required column `nome` to the `simulations` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `simulations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "SimulatorType" ADD VALUE 'APOSENTADORIA';

-- Step 1: Update existing NULL emails with a default value
UPDATE "simulations" SET "email" = 'usuario.legado@exemplo.com' WHERE "email" IS NULL;

-- Step 2: Add the nome column with a default value for existing rows
ALTER TABLE "simulations" ADD COLUMN "nome" TEXT;
UPDATE "simulations" SET "nome" = 'Usuário Legado' WHERE "nome" IS NULL;

-- Step 3: Make both columns required
ALTER TABLE "simulations"
  ALTER COLUMN "nome" SET NOT NULL,
  ALTER COLUMN "email" SET NOT NULL;
