import { Endpoints } from './endpoints';


export class UserApi {
    private endpoints;
    private userDetails;

    constructor(private request: any, userDetails: any) {
        this.request = request;
        this.endpoints = new Endpoints();
        this.userDetails = userDetails;
    }

    async createUser() {
        const createUserResponse = await this.request.post(this.endpoints.getCreateUserEndpoint(), {
            headers: {
                "Authorization": "Basic special-key",
                "Content-Type": "application/json"
            },
            data: [
                this.userDetails
            ]
        });

        return createUserResponse;
    }

    async getExistingUser() {
        const getUserResponse = await this.request.get(this.endpoints.getRetrieveUserEndpoint(this.userDetails.username), {
            headers: {
                "Authorization": "Basic special-key",
            }
        });


        return getUserResponse;
    }
}