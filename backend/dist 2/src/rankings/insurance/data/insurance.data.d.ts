import { InsuranceData } from '../interfaces/insurance-ranking.interface';
export declare const INSURANCE_DATA: InsuranceData[];
export declare function getActiveInsuranceCompanies(): InsuranceData[];
export declare function getInsuranceById(id: number): InsuranceData | undefined;
export declare function getInsurancesByIds(ids: number[]): InsuranceData[];
