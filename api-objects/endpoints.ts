export class Endpoints {
    private baseUrl = 'https://petstore.swagger.io/v2/';
    private createUserUrl = this.baseUrl + 'user/createWithList';
    private retrieveUserUrl = this.baseUrl + 'user/';
    private retrievePetsUrl = this.baseUrl + 'pet/findByStatus?status='

    public getCreateUserEndpoint() {
      return this.createUserUrl;
    }

    public getRetrieveUserEndpoint(username: string) {
        return this.retrieveUserUrl + username;
    }

    public getRetrievePetsEndpoint(status: string) {
        return this.retrievePetsUrl + status;
    }
}