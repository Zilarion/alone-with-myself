import { PrintableType } from './types/PrintableType';

export interface IPrintable {
    type: PrintableType;
    cost: number;
    powerUsage: number;
    id: string;
    duration: number;
    amount?: number;
}
