"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LegacyPrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegacyPrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
let LegacyPrismaService = LegacyPrismaService_1 = class LegacyPrismaService extends client_1.PrismaClient {
    logger = new common_1.Logger(LegacyPrismaService_1.name);
    pool;
    enabled;
    constructor() {
        const databaseUrl = process.env.OLD_DATABASE_URL;
        const enabled = !!databaseUrl;
        const pool = new pg_1.Pool({
            connectionString: databaseUrl || process.env.DATABASE_URL,
        });
        const adapter = new adapter_pg_1.PrismaPg(pool);
        super({ log: ['error', 'warn'], adapter });
        this.pool = pool;
        this.enabled = enabled;
    }
    async onModuleInit() {
        try {
            if (this.enabled) {
                await this.$connect();
                this.logger.log('Connected to legacy database (read-only)');
            }
            else {
                this.logger.warn('Legacy database connection disabled (OLD_DATABASE_URL not set)');
            }
        }
        catch (error) {
            this.logger.error('Failed to connect to legacy database', error);
            throw error;
        }
    }
    async onModuleDestroy() {
        await this.$disconnect();
        await this.pool.end();
        this.logger.log('Disconnected from legacy database');
    }
    async safeQueryRaw(strings, ...values) {
        if (!this.enabled)
            return [];
        return this.$queryRaw(strings, ...values);
    }
};
exports.LegacyPrismaService = LegacyPrismaService;
exports.LegacyPrismaService = LegacyPrismaService = LegacyPrismaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LegacyPrismaService);
//# sourceMappingURL=legacy-prisma.service.js.map