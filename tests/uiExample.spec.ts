import { test, expect } from '@playwright/test'
import { GooglePage } from '../page-objects/google.page';
import { WikipediaPage } from '../page-objects/wikipedia.page';


test('first automation year verification', async () => {
  const { chromium } = require('playwright');
  const firstAutomationText = 'first completely automated industrial process'
  const firstAutomationDate = '1785'
  const googleSearchInput = 'automation'

  //Fix for captcha issue on Google
  const browser = await chromium.launch({
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  const googlePage = new GooglePage(page);
  await googlePage.navigate();
  await googlePage.acceptCookies();
  await googlePage.fillSearchInput(googleSearchInput);
  await googlePage.search();
  await googlePage.clickWikipediaLink();
  const wikipediaPage = new WikipediaPage(page);
  const textFound = await wikipediaPage.searchTextOnWikipedia(firstAutomationText);
  const dateReturned = await wikipediaPage.returnFirstAutomationDate(textFound);
  await wikipediaPage.createScreenshot();
  expect(dateReturned).toBe(firstAutomationDate);

  await browser.close()
});


/*
test('sold pets calculation', async({ request}) => {
  let username = "plasecki" + Math.random();

  const createUserUrl = 'https://petstore.swagger.io/v2/user/createWithList'
  const getUserUrl = 'https://petstore.swagger.io/v2/user/' + username
  const getSoldPetsUrl = 'https://petstore.swagger.io/v2/pet/findByStatus?status=sold'

  const createUserResponse = await request.post(createUserUrl, {
    headers: {
        "Authorization": "Basic special-key",
        "Content-Type": "application/json"
    },
    data: [{
       "id": 0,
       "username": username,
       "firstName": "piotr",
       "lastName": "lasecki",
       "email": "piotr_lasecki@gmail.com",
       "password": "london1!",
       "phone": "885305111",
       "userStatus": 0
    }
    ]
  });

  expect(createUserResponse.ok()).toBeTruthy();

  const getUserResponse = await request.get(getUserUrl, {
    headers: {
      "Authorization": "Basic special-key",
    }
  });

  expect(getUserResponse.ok()).toBeTruthy();

  const getPetsResponse = await request.get(getSoldPetsUrl, {
    headers: {
      "Authorization": "Basic special-key",
    }
  });

  expect(getPetsResponse.ok()).toBeTruthy();

  const soldPets = await getPetsResponse.json();
  console.log(soldPets);

  let soldPetsFormatted: [string, string][] = [];

  soldPets.forEach(function (soldPet) {
    if (soldPet.name != undefined) {
        soldPetsFormatted.push([soldPet.id, soldPet.name]);
    } else {
        soldPet.name = "noName";
        soldPetsFormatted.push([soldPet.id, soldPet.name]);
    }
  });


  const calculation = new PetsCalculation(soldPetsFormatted);
  calculation.calculateNumberOfPets();
})

class PetsCalculation {
    private soldPets: [string, string][];

    public constructor(soldPets: [string, string][]) {
        this.soldPets = soldPets;
    }

    public calculateNumberOfPets(){
        let numberOfSoldPets = new Map<string, number>();

        this.soldPets.forEach(function (soldPet) {
            let petName = soldPet[1];
            let currentNumber = numberOfSoldPets.get(petName);
            if (currentNumber == undefined) {
                numberOfSoldPets.set(petName, 1);
            } else {
                numberOfSoldPets.set(petName, currentNumber + 1);
            }

        });

        console.log("Number of sold pets");
        console.log(numberOfSoldPets);
    }
}*/






