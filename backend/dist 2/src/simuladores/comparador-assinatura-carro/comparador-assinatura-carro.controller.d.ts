import { ComparadorAssinaturaCarroService } from './comparador-assinatura-carro.service';
import { SimularComparadorDto } from './dto/simular-comparador.dto';
import { ResultadoComparadorDto } from './dto/resultado-comparador.dto';
export declare class ComparadorAssinaturaCarroController {
    private readonly comparadorService;
    constructor(comparadorService: ComparadorAssinaturaCarroService);
    simular(dto: SimularComparadorDto): Promise<ResultadoComparadorDto>;
}
