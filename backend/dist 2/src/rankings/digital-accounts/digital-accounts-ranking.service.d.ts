import { DigitalAccountsRankingQueryDto } from './dto/ranking-request.dto';
import { DigitalAccountsRankingResponseDto, DigitalAccountCriterionDto } from './dto/ranking-response.dto';
import { LegacyPrismaService } from '../../prisma/legacy-prisma.service';
export declare class DigitalAccountsRankingService {
    private readonly legacy;
    private readonly logger;
    constructor(legacy: LegacyPrismaService);
    getRanking(query?: DigitalAccountsRankingQueryDto): Promise<DigitalAccountsRankingResponseDto>;
    getCriteria(): Promise<DigitalAccountCriterionDto[]>;
    private applyFilters;
    private toRankingItemDto;
    private toFeaturesDto;
    private getCriteriaDto;
    private getMostRecentUpdate;
    private hydrateMissingFromLegacy;
}
