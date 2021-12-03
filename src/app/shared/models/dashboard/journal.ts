export interface IJournal {
    intitule?: string;
    date?: string;
    icon?: string;
    nameObject?: string;
    action?: string;
    object?: string;

}
export class Journal implements IJournal {
    constructor(
        public intitule?: string,
        public date?: string,
        icon?: string,
        public nameObject?: string,
        public action?: string,
        public object?: string
    ) {}
}
