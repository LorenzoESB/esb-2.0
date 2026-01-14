import { PrismaService } from '../../prisma/prisma.service';
import { SimularComparadorDto } from './dto/simular-comparador.dto';
import { ResultadoComparadorDto } from './dto/resultado-comparador.dto';
import { EmailService } from '../../email/email.service';
export declare class ComparadorAssinaturaCarroService {
    private readonly prisma;
    private readonly emailService;
    private readonly logger;
    constructor(prisma: PrismaService, emailService: EmailService);
    simular(dto: SimularComparadorDto): Promise<ResultadoComparadorDto>;
    private validarDados;
    private formatarCenario;
    private salvarSimulacao;
}
