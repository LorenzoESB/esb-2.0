import { PrismaService } from '../../prisma/prisma.service';
import { SimularTaxaMaquininhaDto } from './dto/simular-taxa-maquininha.dto';
import { ResultadoTaxaMaquininhaDto } from './dto/resultado-taxa-maquininha.dto';
import { EmailService } from '../../email/email.service';
export declare class TaxaMaquininhaService {
    private readonly prisma;
    private readonly emailService;
    private readonly logger;
    constructor(prisma: PrismaService, emailService: EmailService);
    simular(dto: SimularTaxaMaquininhaDto): Promise<ResultadoTaxaMaquininhaDto>;
    private montarFiltros;
    private salvarSimulacao;
}
