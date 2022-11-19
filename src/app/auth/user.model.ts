export class User {
    constructor(public email: string,
        public id: string,
        private _token: string,
        private _tokenExpiringDate: Date) { }

    get token() {
        if (!this._tokenExpiringDate || new Date() > this._tokenExpiringDate) {
            return null;
        }
        return this._token;
    }
}