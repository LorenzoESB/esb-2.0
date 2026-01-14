import { CarSubscriptionRankingService } from './car-subscription-ranking.service';
import { CarSubscriptionCriterionDto, CarSubscriptionRankingResponseDto } from './dto/ranking-response.dto';
import { CarSubscriptionRankingQueryDto } from './dto/ranking-request.dto';
export declare class CarSubscriptionRankingController {
    private readonly rankingService;
    private readonly logger;
    constructor(rankingService: CarSubscriptionRankingService);
    getRanking(query: CarSubscriptionRankingQueryDto): Promise<CarSubscriptionRankingResponseDto>;
    getCriteria(): Promise<CarSubscriptionCriterionDto[]>;
}
