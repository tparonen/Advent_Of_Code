const {
    calculateFuelRequirement,
    calculateTotalFuelRequirement
} = require('./fuel');

describe('module fuel requirement calculator', () => {

    test('given the mass of a module, calculates the fuel required to launch it', () => {
        expect(calculateFuelRequirement(12)).toBe(2);
        expect(calculateFuelRequirement(14)).toBe(2);
        expect(calculateFuelRequirement(1969)).toBe(654);
        expect(calculateFuelRequirement(100756)).toBe(33583);
    });

    test('given the mass of the fuel required by a module, calculates the additional fuel required', () => {
        expect(calculateTotalFuelRequirement(2)).toBe(0);
        expect(calculateTotalFuelRequirement(1969)).toBe(966);
        expect(calculateTotalFuelRequirement(100756)).toBe(50346);
    })

});