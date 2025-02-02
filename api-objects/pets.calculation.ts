export class PetsCalculation {
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

        return numberOfSoldPets;
    }
}