const calculateFuelRequirement = (mass) => {
    const fuelRequirement = Math.floor(mass / 3) - 2;
    return fuelRequirement > 0 ? fuelRequirement : 0;
};

const calculateTotalFuelRequirement = (mass) => {
    let fuelRequirement = calculateFuelRequirement(mass);
    if (fuelRequirement > 0) {
        fuelRequirement += calculateTotalFuelRequirement(fuelRequirement);
    }
    return fuelRequirement
};

module.exports.calculateFuelRequirement = calculateFuelRequirement;
module.exports.calculateTotalFuelRequirement = calculateTotalFuelRequirement;