import { ComparadorMaquininhaService } from './comparador-maquininha.service';
import { CompararMaquininhaDto } from './dto/comparar-maquininha.dto';
import { ResultadoComparacaoDto } from './dto/resultado-comparacao.dto';
import { ListaMaquininhasDto } from './dto/maquininha-opcao.dto';
export declare class ComparadorMaquininhaController {
    private readonly comparadorMaquininhaService;
    private readonly logger;
    constructor(comparadorMaquininhaService: ComparadorMaquininhaService);
    listarMaquininhas(): Promise<ListaMaquininhasDto>;
    comparar(dto: CompararMaquininhaDto): Promise<ResultadoComparacaoDto>;
}
