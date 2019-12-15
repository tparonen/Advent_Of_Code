const planetPotential = (planet) => {
    const { x: px, y: py, z: pz } = planet.position;
    return Math.abs(px) + Math.abs(py) + Math.abs(pz);
};

// const calculatePotentialEnergy = (planets) => {
//     return planets.reduce((energy, p) => energy + planetPotential(p), 0);
// };

const planetKinetic = (planet) => {
    const { x: vx, y: vy, z: vz } = planet.velocity;
    return Math.abs(vx) + Math.abs(vy) + Math.abs(vz);
};

// const calculateKineticEnergy = (planets) => {
//     return planets.reduce((energy, p) => energy + planetKinetic(p), 0);
// };

const planetTotal = (planet) => {
    return planetPotential(planet) * planetKinetic(planet);
};

const calculateTotalEnergy = (planets) => {
    return planets.reduce((energy, p) => energy + planetTotal(p), 0);
};

module.exports.calculateTotalEnergy = calculateTotalEnergy;