import { RendaFixaService } from './renda-fixa.service';
import { SimularRendaFixaDto } from './dto/simular-renda-fixa.dto';
import { ResultadoRendaFixaDto } from './dto/resultado-renda-fixa.dto';
export declare class RendaFixaController {
    private readonly rendaFixaService;
    private readonly logger;
    constructor(rendaFixaService: RendaFixaService);
    simular(dto: SimularRendaFixaDto): Promise<ResultadoRendaFixaDto>;
}
