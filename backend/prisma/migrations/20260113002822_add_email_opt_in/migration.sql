/*
  Warnings:

  - You are about to drop the `admin_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `analytics_events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `data_health_checks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ranking_metadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `simulator_metadata` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "simulations" ADD COLUMN     "email_opt_in_at" TIMESTAMP(3),
ADD COLUMN     "email_opt_in_content" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "email_opt_in_simulation" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "admin_users";

-- DropTable
DROP TABLE "analytics_events";

-- DropTable
DROP TABLE "data_health_checks";

-- DropTable
DROP TABLE "ranking_metadata";

-- DropTable
DROP TABLE "simulator_metadata";
