import { FinanciamentoImovelService } from './financiamento-imovel.service';
import { SimularFinanciamentoImovelDto } from './dto/simular-financiamento-imovel.dto';
import { ResultadoFinanciamentoImovelDto } from './dto/resultado-financiamento-imovel.dto';
export declare class FinanciamentoImovelController {
    private readonly financiamentoImovelService;
    constructor(financiamentoImovelService: FinanciamentoImovelService);
    simular(dto: SimularFinanciamentoImovelDto): Promise<ResultadoFinanciamentoImovelDto[]>;
}
