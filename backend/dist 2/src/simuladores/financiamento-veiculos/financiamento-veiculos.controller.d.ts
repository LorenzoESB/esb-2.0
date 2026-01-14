import { FinanciamentoVeiculosService } from './financiamento-veiculos.service';
import { SimularFinanciamentoVeiculosDto } from './dto/simular-financiamento-veiculos.dto';
import { ResultadoFinanciamentoVeiculosDto } from './dto/resultado-financiamento-veiculos.dto';
export declare class FinanciamentoVeiculosController {
    private readonly financiamentoVeiculosService;
    constructor(financiamentoVeiculosService: FinanciamentoVeiculosService);
    simular(dto: SimularFinanciamentoVeiculosDto): Promise<ResultadoFinanciamentoVeiculosDto[]>;
}
