import { DigitalAccountsRankingService } from './digital-accounts-ranking.service';
import { DigitalAccountCriterionDto, DigitalAccountsRankingResponseDto } from './dto/ranking-response.dto';
import { DigitalAccountsRankingQueryDto } from './dto/ranking-request.dto';
export declare class DigitalAccountsRankingController {
    private readonly rankingService;
    private readonly logger;
    constructor(rankingService: DigitalAccountsRankingService);
    getRanking(query: DigitalAccountsRankingQueryDto): Promise<DigitalAccountsRankingResponseDto>;
    getCriteria(): Promise<DigitalAccountCriterionDto[]>;
}
