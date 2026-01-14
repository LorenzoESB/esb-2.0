import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SimularFinanciamentoImovelDto } from './dto/simular-financiamento-imovel.dto';
import { ResultadoFinanciamentoImovelDto } from './dto/resultado-financiamento-imovel.dto';
import { TaxasFinanciamentoData } from './data/taxas-financiamento.data';
import { SimulatorMetadataService } from '../metadata/simulator-metadata.service';
import { ISimulatorStrategy } from '../interfaces/simulator-strategy.interface';
import { SimulatorRegistry } from '../registry/simulator.registry';
import { EmailService } from '../../email/email.service';
export declare class FinanciamentoImovelService implements ISimulatorStrategy, OnModuleInit {
    private readonly prisma;
    private readonly taxasFinanciamentoData;
    private readonly metadataService;
    private readonly registry;
    private readonly emailService;
    private readonly logger;
    constructor(prisma: PrismaService, taxasFinanciamentoData: TaxasFinanciamentoData, metadataService: SimulatorMetadataService, registry: SimulatorRegistry, emailService: EmailService);
    onModuleInit(): void;
    getSimulatorType(): string;
    execute(input: any, metadata?: any): Promise<any>;
    simular(dto: SimularFinanciamentoImovelDto, metadata?: any): Promise<ResultadoFinanciamentoImovelDto[]>;
    private validarDados;
    private calcularOfertas;
    private salvarSimulacao;
}
