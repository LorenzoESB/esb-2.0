import { AposentadoriaService } from './aposentadoria.service';
import { SimularAposentadoriaDto } from './dto/simular-aposentadoria.dto';
import { ResultadoAposentadoriaDto } from './dto/resultado-aposentadoria.dto';
export declare class AposentadoriaController {
    private readonly aposentadoriaService;
    private readonly logger;
    constructor(aposentadoriaService: AposentadoriaService);
    simular(dto: SimularAposentadoriaDto): Promise<ResultadoAposentadoriaDto>;
}
