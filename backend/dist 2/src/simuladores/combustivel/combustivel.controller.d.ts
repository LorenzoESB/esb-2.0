import { CombustivelService } from './combustivel.service';
import { CombustivelInputDto } from './dto/combustivel-input.dto';
import { CombustivelOutputDto } from './dto/combustivel-output.dto';
export declare class CombustivelController {
    private readonly combustivelService;
    private readonly logger;
    constructor(combustivelService: CombustivelService);
    comparaEconomia(input: CombustivelInputDto): Promise<CombustivelOutputDto>;
}
