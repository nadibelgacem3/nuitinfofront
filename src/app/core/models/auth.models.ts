export class User {
    id: number;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    // tslint:disable-next-line:variable-name
    id_token?: string;
    email: string;
}
