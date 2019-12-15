const fs = require('fs');
const {calculateTotalEnergy} = require("./energy");
const {runSimulation} = require("./simulation");
const {Planet} = require("./planet");

const readPlanets = (data) => {
    const lines = data.split('\n');
    const re = /^<x=([-]?[\d]+), y=([-]?[\d]+), z=([-]?[\d]+)>$/;
    return lines.map(line => {
        const result = re.exec(line);
        return new Planet(
            parseInt(result[1], 10),
            parseInt(result[2], 10),
            parseInt(result[3], 10)
        );
    });
};

const SIMULATION_STEPS = Number.MAX_SAFE_INTEGER;

const processInput = async (input) => {
    const planets = readPlanets(input);

    runSimulation(planets, SIMULATION_STEPS);

    const totalEnergy = calculateTotalEnergy(planets);

    console.log('total energy', totalEnergy);
};

const run = (filename) => {
    fs.readFile(filename, 'utf8', async (err, data) => {
        if (err) {
            console.error(err);
            throw err;
        }
        await processInput(data);
    });
};

module.exports.run = run;