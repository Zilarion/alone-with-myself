import { PrintableType } from './types/PrintableType';
import { ResourceSet } from './types/ResourceSet';

export interface IPrintable {
    type: PrintableType;
    cost: ResourceSet;
    id: string;
    duration: number;
    amount?: number;
}
