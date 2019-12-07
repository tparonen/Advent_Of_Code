const {calculateFuelRequirement, calculateTotalFuelRequirement} = require("./fuel");

const reader = require('readline').createInterface({
    input: require('fs').createReadStream(__dirname + '/input.txt')
});

const fuelAmounts = [];

reader.on('line', (mass) => {
    fuelAmounts.push({
        requiredFuel: calculateFuelRequirement(mass),
        requiredFuelTotal: calculateTotalFuelRequirement(mass)
    });
});

reader.on('close', () => {

    const fuel = fuelAmounts.reduce((total, fuelAmount) => total + fuelAmount.requiredFuel, 0);
    console.log('Total required without considering mass of the fuel', fuel);

    const fuelTotal = fuelAmounts.reduce((total, fuelAmount) => total + fuelAmount.requiredFuelTotal, 0);
    console.log('Total required when mass of the fuel is also considered', fuelTotal);

});