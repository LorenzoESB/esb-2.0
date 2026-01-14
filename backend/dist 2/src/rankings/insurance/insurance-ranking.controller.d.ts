import { InsuranceRankingService } from './insurance-ranking.service';
import { InsuranceRankingResponseDto, InsuranceRankingCriterionDto } from './dto/ranking-response.dto';
import { InsuranceRankingQueryDto } from './dto/ranking-request.dto';
export declare class InsuranceRankingController {
    private readonly rankingService;
    private readonly logger;
    constructor(rankingService: InsuranceRankingService);
    getRanking(query: InsuranceRankingQueryDto): Promise<InsuranceRankingResponseDto>;
    getCriteria(): Promise<InsuranceRankingCriterionDto[]>;
}
