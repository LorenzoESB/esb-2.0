-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "SimulatorType" ADD VALUE 'FINANCIAMENTO_IMOVEL';
ALTER TYPE "SimulatorType" ADD VALUE 'FINANCIAMENTO_VEICULOS';
ALTER TYPE "SimulatorType" ADD VALUE 'COMPARADOR_ASSINATURA_CARRO';
