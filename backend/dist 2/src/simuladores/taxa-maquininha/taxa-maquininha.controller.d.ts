import { TaxaMaquininhaService } from './taxa-maquininha.service';
import { SimularTaxaMaquininhaDto } from './dto/simular-taxa-maquininha.dto';
import { ResultadoTaxaMaquininhaDto } from './dto/resultado-taxa-maquininha.dto';
export declare class TaxaMaquininhaController {
    private readonly taxaMaquininhaService;
    private readonly logger;
    constructor(taxaMaquininhaService: TaxaMaquininhaService);
    simular(dto: SimularTaxaMaquininhaDto): Promise<ResultadoTaxaMaquininhaDto>;
}
