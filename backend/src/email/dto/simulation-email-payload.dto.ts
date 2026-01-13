export class SimulationEmailPayload {
  simulationType: string;
  userEmail: string;
  userName: string;
  input: Record<string, any>;
  output: Record<string, any>;
  summary: string;
  createdAt: Date;
}
