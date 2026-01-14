import { AmortizacaoService } from './amortizacao.service';
import { AmortizacaoInputDto } from './dto/amortizacao-input.dto';
import { AmortizacaoSimplesOutputDto, SimulacaoComparativaDto } from './dto/amortizacao-output.dto';
export declare class AmortizacaoController {
    private readonly amortizacaoService;
    private readonly logger;
    constructor(amortizacaoService: AmortizacaoService);
    calcularAmortizacao(input: AmortizacaoInputDto): Promise<AmortizacaoSimplesOutputDto>;
    compararSistemas(input: AmortizacaoInputDto): Promise<SimulacaoComparativaDto>;
}
