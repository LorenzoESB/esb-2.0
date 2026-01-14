import { InsuranceRankingResponseDto, InsuranceRankingCriterionDto } from './dto/ranking-response.dto';
import { InsuranceRankingQueryDto } from './dto/ranking-request.dto';
export declare class InsuranceRankingService {
    private readonly logger;
    getRanking(query?: InsuranceRankingQueryDto): Promise<InsuranceRankingResponseDto>;
    getCriteria(): Promise<InsuranceRankingCriterionDto[]>;
    private applyFilters;
    private toRankingItemDto;
    private toCoverageDto;
    private toServicesDto;
    private toPricingDto;
    private getScoreBreakdown;
    private getCriteriaDto;
    private getMostRecentUpdate;
}
