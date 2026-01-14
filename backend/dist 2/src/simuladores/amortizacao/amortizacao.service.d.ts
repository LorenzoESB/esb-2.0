import { AmortizacaoInputDto } from './dto/amortizacao-input.dto';
import { AmortizacaoSimplesOutputDto } from './dto/amortizacao-output.dto';
import { SimulacaoComparativaDto } from './dto/amortizacao-output.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../../email/email.service';
export declare class AmortizacaoService {
    private readonly prisma;
    private readonly emailService;
    private readonly logger;
    constructor(prisma: PrismaService, emailService: EmailService);
    calcularAmortizacao(input: AmortizacaoInputDto): Promise<AmortizacaoSimplesOutputDto>;
    private salvarSimulacao;
    private calcularTaxaJurosMensal;
    private computeTotalInterest;
    calcularAmortizacaoSimples(input: AmortizacaoInputDto): Promise<AmortizacaoSimplesOutputDto>;
    compararSistemas(input: AmortizacaoInputDto): Promise<SimulacaoComparativaDto>;
}
