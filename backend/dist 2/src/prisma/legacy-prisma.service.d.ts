import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class LegacyPrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    private readonly pool;
    private readonly enabled;
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    safeQueryRaw<T = any>(strings: TemplateStringsArray, ...values: any[]): Promise<T[]>;
}
