export interface ISimulatorStrategy {
    getSimulatorType(): string;
    execute(input: any, metadata?: any): Promise<any>;
}
