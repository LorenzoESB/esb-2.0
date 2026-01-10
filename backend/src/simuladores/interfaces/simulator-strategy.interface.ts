
/**
 * Interface genérica para estratégias de simuladores.
 * Todos os serviços de simuladores devem implementar esta interface.
 */
export interface ISimulatorStrategy {
  /**
   * Identificador único do tipo de simulador (deve corresponder ao 'type' ou 'slug' no Strapi)
   */
  getSimulatorType(): string;

  /**
   * Executa a simulação com base no input e metadados opcionais.
   * @param input Dados de entrada da simulação
   * @param metadata Metadados opcionais vindos do Strapi (parâmetros, taxas, etc)
   */
  execute(input: any, metadata?: any): Promise<any>;
}
