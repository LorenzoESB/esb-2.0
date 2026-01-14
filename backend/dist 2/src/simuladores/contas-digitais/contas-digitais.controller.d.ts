import { ContasDigitaisService } from './contas-digitais.service';
import { SimularContasDigitaisFisicaDto, SimularContasDigitaisJuridicaDto } from './dto/simular-contas-digitais.dto';
import { ResultadoContasDigitaisDto } from './dto/resultado-contas-digitais.dto';
export declare class ContasDigitaisController {
    private readonly contasDigitaisService;
    private readonly logger;
    constructor(contasDigitaisService: ContasDigitaisService);
    simularPessoaFisica(dto: SimularContasDigitaisFisicaDto): Promise<ResultadoContasDigitaisDto[]>;
    simularPessoaJuridica(dto: SimularContasDigitaisJuridicaDto): Promise<ResultadoContasDigitaisDto[]>;
}
