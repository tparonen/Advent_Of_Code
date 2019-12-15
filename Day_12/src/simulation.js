const {Planet} = require("./planet");
const runSimulation = (planets, simulationSteps) => {

    const copyOfPlanets = planets.map(p => new Planet(p.position.x, p.position.y, p.position.z));

    //debugLog(planets, 0);

    for (let i = 0; i < simulationSteps; i++) {
        applyGravity(planets);
        updatePositions(planets);

        //debugLog(planets, i);

        if (planets.every((p,idx) => p.equalTo(copyOfPlanets[idx]))) {
            console.log('Match found!');
            debugLog(planets, i);
            break;
        }
    }
};

const debugLog = (planets, index) => {
    console.log(`Step ${index + 1}`);
    planets.forEach((planet, index) => {
        console.log(planet.toString());
    });
    console.log('________________________________________________________');
};

const forEachPair = (planets, callback) => {
    for (let i = 0; i < planets.length; i++) {
        for (let j = 0; j < planets.length; j++) {
            if (j <= i) {
                continue;
            }
            callback(planets[i], planets[j]);
        }
    }
}

const applyGravityToAxis = (p1, p2, axis) => {
    if (p1.position[axis] < p2.position[axis]) {
        p1.velocity[axis] += 1;
        p2.velocity[axis] -= 1;
    } else if (p2.position[axis] < p1.position[axis]) {
        p1.velocity[axis] -= 1;
        p2.velocity[axis] += 1;
    }
};

const applyGravity = (planets) => {
    forEachPair(planets, (p1, p2) => {
        applyGravityToAxis(p1, p2, 'x');
        applyGravityToAxis(p1, p2, 'y');
        applyGravityToAxis(p1, p2, 'z');
    });
};

const updatePositions = (planets) => {
    planets.forEach(planet => {
        planet.position.x += planet.velocity.x;
        planet.position.y += planet.velocity.y;
        planet.position.z += planet.velocity.z;
    });
};

module.exports.runSimulation = runSimulation;