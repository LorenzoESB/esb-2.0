import { CarSubscriptionRankingQueryDto } from './dto/ranking-request.dto';
import { CarSubscriptionCriterionDto, CarSubscriptionRankingResponseDto } from './dto/ranking-response.dto';
import { LegacyPrismaService } from '../../prisma/legacy-prisma.service';
export declare class CarSubscriptionRankingService {
    private readonly legacy;
    private readonly logger;
    constructor(legacy: LegacyPrismaService);
    getRanking(query?: CarSubscriptionRankingQueryDto): Promise<CarSubscriptionRankingResponseDto>;
    getCriteria(): Promise<CarSubscriptionCriterionDto[]>;
    private applyFilters;
    private toRankingItemDto;
    private getCriteriaDto;
    private getMostRecentUpdate;
    private hydrateMissingFromLegacy;
}
