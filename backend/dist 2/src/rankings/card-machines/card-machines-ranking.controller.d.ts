import { CardMachinesRankingService } from './card-machines-ranking.service';
import { CardMachineRankingResponseDto, RankingCriterionDto } from './dto/ranking-response.dto';
import { CardMachineRankingQueryDto } from './dto/ranking-request.dto';
export declare class CardMachinesRankingController {
    private readonly rankingService;
    private readonly logger;
    constructor(rankingService: CardMachinesRankingService);
    getRanking(query: CardMachineRankingQueryDto): Promise<CardMachineRankingResponseDto>;
    getCriteria(): Promise<RankingCriterionDto[]>;
}
