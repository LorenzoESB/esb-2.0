import { CardMachineRankingResponseDto, RankingCriterionDto } from './dto/ranking-response.dto';
import { CardMachineRankingQueryDto } from './dto/ranking-request.dto';
export declare class CardMachinesRankingService {
    private readonly logger;
    getRanking(query?: CardMachineRankingQueryDto): Promise<CardMachineRankingResponseDto>;
    getCriteria(): Promise<RankingCriterionDto[]>;
    private applyFilters;
    private toRankingItemDto;
    private toFeaturesDto;
    private toPricingDto;
    private getCriteriaDto;
    private getMostRecentUpdate;
}
