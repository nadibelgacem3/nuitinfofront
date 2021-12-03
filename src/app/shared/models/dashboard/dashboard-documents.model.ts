export interface IDocuments {
    total_bonEntrees?: number;
    total_bonsLivraison?: number;
    total_quotes?: number;
    total_invoices?: number;
    total_bonsSortie?: number;
    total_commandes?: number;
}

export class Documents implements IDocuments {
    constructor(
        public total_bonEntrees?: number,
        public total_bonsLivraison?: number,
        public total_quotes?: number,
        public total_invoices?: number,
        public total_bonsSortie?: number,
        public total_commandes?: number
    ) {
    }
}

