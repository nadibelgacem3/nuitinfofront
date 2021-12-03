export interface IBestSupliers {
    id?: number;
    chiffreAffaire?: any;
    firstName?: string;
    lastName?: string;
    image?: string;
    imageContentType?: string;
    percent?: number;

}
export class BestSupliers implements IBestSupliers {
    constructor(
        public id?: number,
        public chiffreAffaire?: any,
        public firstName?: string,
        public lastName?: string,
        public image?: string,
        public imageContentType?: string,
        percent?: number
    ) {}
}
