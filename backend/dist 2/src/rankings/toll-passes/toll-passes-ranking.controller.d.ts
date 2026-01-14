import { TollPassesRankingService } from './toll-passes-ranking.service';
import { TollPassCriterionDto, TollPassRankingResponseDto } from './dto/ranking-response.dto';
import { TollPassRankingQueryDto } from './dto/ranking-request.dto';
export declare class TollPassesRankingController {
    private readonly rankingService;
    private readonly logger;
    constructor(rankingService: TollPassesRankingService);
    getRanking(query: TollPassRankingQueryDto): Promise<TollPassRankingResponseDto>;
    getCriteria(): Promise<TollPassCriterionDto[]>;
}
