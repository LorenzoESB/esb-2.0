-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "SimulatorType" ADD VALUE 'CONTAS_DIGITAIS';
ALTER TYPE "SimulatorType" ADD VALUE 'TAXA_MAQUININHA';
ALTER TYPE "SimulatorType" ADD VALUE 'COMPARADOR_MAQUININHA';

-- CreateTable
CREATE TABLE "admin_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'maintainer',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ranking_metadata" (
    "id" TEXT NOT NULL,
    "ranking_id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "parameters" JSONB DEFAULT '{}',
    "data_sources" JSONB DEFAULT '{}',
    "override_legacy" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ranking_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulator_metadata" (
    "id" TEXT NOT NULL,
    "simulator_id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "category" TEXT,
    "configuration" JSONB DEFAULT '{}',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "simulator_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics_events" (
    "id" TEXT NOT NULL,
    "page_path" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "metadata" JSONB DEFAULT '{}',
    "occurred_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_health_checks" (
    "id" TEXT NOT NULL,
    "check_type" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "issues" JSONB DEFAULT '[]',
    "checked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "data_health_checks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- CreateIndex
CREATE INDEX "admin_users_email_idx" ON "admin_users"("email");

-- CreateIndex
CREATE INDEX "admin_users_role_idx" ON "admin_users"("role");

-- CreateIndex
CREATE UNIQUE INDEX "ranking_metadata_ranking_id_key" ON "ranking_metadata"("ranking_id");

-- CreateIndex
CREATE INDEX "ranking_metadata_ranking_id_idx" ON "ranking_metadata"("ranking_id");

-- CreateIndex
CREATE UNIQUE INDEX "simulator_metadata_simulator_id_key" ON "simulator_metadata"("simulator_id");

-- CreateIndex
CREATE INDEX "simulator_metadata_simulator_id_idx" ON "simulator_metadata"("simulator_id");

-- CreateIndex
CREATE INDEX "simulator_metadata_category_idx" ON "simulator_metadata"("category");

-- CreateIndex
CREATE INDEX "analytics_events_page_path_idx" ON "analytics_events"("page_path");

-- CreateIndex
CREATE INDEX "analytics_events_event_type_idx" ON "analytics_events"("event_type");

-- CreateIndex
CREATE INDEX "analytics_events_occurred_at_idx" ON "analytics_events"("occurred_at" DESC);

-- CreateIndex
CREATE INDEX "data_health_checks_entity_type_entity_id_idx" ON "data_health_checks"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "data_health_checks_status_idx" ON "data_health_checks"("status");

-- CreateIndex
CREATE INDEX "data_health_checks_checked_at_idx" ON "data_health_checks"("checked_at" DESC);
