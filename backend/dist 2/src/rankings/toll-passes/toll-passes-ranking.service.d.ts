import { TollPassRankingQueryDto } from './dto/ranking-request.dto';
import { TollPassCriterionDto, TollPassRankingResponseDto } from './dto/ranking-response.dto';
import { LegacyPrismaService } from '../../prisma/legacy-prisma.service';
export declare class TollPassesRankingService {
    private readonly legacy;
    private readonly logger;
    constructor(legacy: LegacyPrismaService);
    getRanking(query?: TollPassRankingQueryDto): Promise<TollPassRankingResponseDto>;
    getCriteria(): Promise<TollPassCriterionDto[]>;
    private applyFilters;
    private toRankingItemDto;
    private getCriteriaDto;
    private getMostRecentUpdate;
    private hydrateMissingFromLegacy;
}
