import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class LegacyPrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(LegacyPrismaService.name);
  private readonly pool: Pool;
  private readonly enabled: boolean;

  constructor() {
    const databaseUrl = process.env.OLD_DATABASE_URL;

    const enabled = !!databaseUrl;
    const pool = new Pool({
      connectionString: databaseUrl || process.env.DATABASE_URL,
    });
    const adapter = new PrismaPg(pool);

    super({ log: ['error', 'warn'], adapter });

    this.pool = pool;
    this.enabled = enabled;
  }

  async onModuleInit() {
    try {
      if (this.enabled) {
        await this.$connect();
        this.logger.log('Connected to legacy database (read-only)');
      } else {
        this.logger.warn('Legacy database connection disabled (OLD_DATABASE_URL not set)');
      }
    } catch (error) {
      this.logger.error('Failed to connect to legacy database', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await this.pool.end();
    this.logger.log('Disconnected from legacy database');
  }

  async safeQueryRaw<T = any>(strings: TemplateStringsArray, ...values: any[]): Promise<T[]> {
    if (!this.enabled) return [];
    // @ts-ignore
    return this.$queryRaw(strings, ...values);
  }
}
