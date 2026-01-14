import { HttpService } from '@nestjs/axios';
import { SimularRendaFixaDto } from './dto/simular-renda-fixa.dto';
import { ResultadoRendaFixaDto } from './dto/resultado-renda-fixa.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { RendaFixaApiClient } from './clients/renda-fixa-api.client';
import { EmailService } from '../../email/email.service';
export declare class RendaFixaService {
    private readonly httpService;
    private readonly prisma;
    private readonly rendaFixaApiClient;
    private readonly emailService;
    private readonly logger;
    constructor(httpService: HttpService, prisma: PrismaService, rendaFixaApiClient: RendaFixaApiClient, emailService: EmailService);
    simular(dto: SimularRendaFixaDto): Promise<ResultadoRendaFixaDto>;
    private transformarOfertasInvestimento;
    private transformarOfertasTesouro;
    private obterSelicAtual;
    private obterCdiAtual;
    private obterTrMensal;
    private formatarResultado;
    private formatarModalidade;
    private arredondar;
    private salvarSimulacao;
}
