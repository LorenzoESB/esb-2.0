import { MachineData } from '../interfaces/machine-ranking.interface';
export declare const CARD_MACHINES_DATA: MachineData[];
export declare function getActiveCardMachines(): MachineData[];
export declare function getCardMachineById(id: number): MachineData | undefined;
export declare function getCardMachinesByIds(ids: number[]): MachineData[];
