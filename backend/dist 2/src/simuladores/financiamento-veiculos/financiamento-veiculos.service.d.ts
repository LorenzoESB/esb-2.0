import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SimularFinanciamentoVeiculosDto } from './dto/simular-financiamento-veiculos.dto';
import { ResultadoFinanciamentoVeiculosDto } from './dto/resultado-financiamento-veiculos.dto';
import { TaxasVeiculosData } from './data/taxas-veiculos.data';
import { SimulatorMetadataService } from '../metadata/simulator-metadata.service';
import { ISimulatorStrategy } from '../interfaces/simulator-strategy.interface';
import { SimulatorRegistry } from '../registry/simulator.registry';
import { EmailService } from '../../email/email.service';
export declare class FinanciamentoVeiculosService implements ISimulatorStrategy, OnModuleInit {
    private readonly prisma;
    private readonly taxasVeiculosData;
    private readonly metadataService;
    private readonly registry;
    private readonly emailService;
    private readonly logger;
    constructor(prisma: PrismaService, taxasVeiculosData: TaxasVeiculosData, metadataService: SimulatorMetadataService, registry: SimulatorRegistry, emailService: EmailService);
    onModuleInit(): void;
    getSimulatorType(): string;
    execute(input: any, metadata?: any): Promise<any>;
    simular(dto: SimularFinanciamentoVeiculosDto, metadata?: any): Promise<ResultadoFinanciamentoVeiculosDto[]>;
    private validarDados;
    private calcularOfertas;
    private salvarSimulacao;
}
