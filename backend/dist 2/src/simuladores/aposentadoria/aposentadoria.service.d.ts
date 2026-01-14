import { ConfigService } from '@nestjs/config';
import { SimularAposentadoriaDto } from './dto/simular-aposentadoria.dto';
import { ResultadoAposentadoriaDto } from './dto/resultado-aposentadoria.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../../email/email.service';
export declare class AposentadoriaService {
    private configService;
    private readonly prisma;
    private readonly emailService;
    private readonly logger;
    private readonly taxaMensal;
    private readonly expectativaVida;
    constructor(configService: ConfigService, prisma: PrismaService, emailService: EmailService);
    simular(dto: SimularAposentadoriaDto): Promise<ResultadoAposentadoriaDto>;
    private calcularPorRendaDesejada;
    private calcularPorContribuicao;
    private calcularSustentabilidade;
    private calcularSustentabilidadeSimples;
    private criarCenarioSaque;
    private calcularResumo;
    private validarDados;
    private arredondar;
    private salvarSimulacao;
}
