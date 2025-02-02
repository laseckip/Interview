import { test, expect } from '@playwright/test'
import { UserApi } from '../api-objects/userApi';
import { PetsApi } from '../api-objects/petsApi';
import { PetsCalculation } from '../api-objects/pets.calculation';


test('create user and verify', async({request}) => {
    const username = "plasecki" + Math.random();
    const userDetails = {
        "id": 0,
        "username": username,
        "firstName": "piotr",
        "lastName": "lasecki",
        "email": "piotr_lasecki@gmail.com",
        "password": "london1!",
        "phone": "885305111",
        "userStatus": 0
    }

    const userApi = new UserApi(request, userDetails);
    const createUserResponse = await userApi.createUser();
    expect(createUserResponse.ok()).toBeTruthy();
    const getUserResponse = await userApi.getExistingUser();
    expect(getUserResponse.ok()).toBeTruthy();
    console.log("User data retrieved")
    console.log(await getUserResponse.json());
});

test('sold pets calculation', async({ request}) => {
    const petsApi = new PetsApi(request);
    const soldPetsResponse = await petsApi.getSoldPets();
    expect(soldPetsResponse.ok()).toBeTruthy();

    const soldPetsBody = await soldPetsResponse.json();
    console.log("soldPets - response body");
    console.log(soldPetsBody);

    const soldPetsFormatted = petsApi.formatPetsResponse(soldPetsBody);
    console.log("soldPets - formatted");
    console.log(soldPetsFormatted);


    const calculation = new PetsCalculation(soldPetsFormatted);
    const numberOfSoldPets = calculation.calculateNumberOfPets();
    console.log("sold pets - name: number");
    console.log(numberOfSoldPets);
})








