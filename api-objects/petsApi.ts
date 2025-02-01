import { Endpoints } from './endpoints';


export class PetsApi {
    private endpoints: any;

    constructor(private request: any) {
        this.request = request;
        this.endpoints = new Endpoints();
    }

    async getSoldPets() {
        const getPetsResponse = await this.request.get(this.endpoints.getRetrievePetsEndpoint('sold'), {
            headers: {
                "Authorization": "Basic special-key",
            }
        });

        return getPetsResponse;
    }

    public formatPetsResponse(soldPets: any) {
        let soldPetsFormatted: [string, string][] = [];


        soldPets.forEach(function (soldPet: any) {
            if (soldPet.name != undefined) {
                soldPetsFormatted.push([soldPet.id, soldPet.name]);
            } else {
                soldPet.name = "noName";
                soldPetsFormatted.push([soldPet.id, soldPet.name]);
            }
        });

        return soldPetsFormatted;
    }
}