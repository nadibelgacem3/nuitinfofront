export class IShipping {
    id?: number;
    providerName?: string;
    frais?: number;
    photoUrl?: string;
    description?: string;
    delay?: number;
}
export interface SearchResultIShipping {
    tables: IShipping[];
    total: number;
}
