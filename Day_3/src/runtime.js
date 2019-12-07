const fs = require('fs');
const LineSegment = require("./line-segment");
const {findIntersections, calculateManhattanDistance, calculateSteps} = require("./math");
const {Grid} = require('./grid');
const {transformMoveToPoint} = require("./transform");

const grids = [];

const createReader = (filename) => {
    return require('readline').createInterface({
        input: require('fs').createReadStream(filename)
    });
};

const onInputLine = (input) => {
    const grid = new Grid();
    const moves = input.split(',');

    moves.forEach(move => {
        grid.addToPath(transformMoveToPoint(move));
    });

    grids.push(grid);
};

const onClose = () => {

    // grids[0].lineSegments.forEach(seg => {
    //     console.log(seg);
    // });

    const intersections = findIntersections(grids[0], grids[1]);

    const candidates = intersections.map(intersection => {
        return {
            position: intersection,
            distance: calculateManhattanDistance(intersection),
            steps: calculateSteps(grids[0], grids[1], intersection)
        }
    });

    candidates.sort((c1, c2) => c2.steps - c1.steps);
    // candidates.sort((c1, c2) => c2.distance - c1.distance);
    //
    // candidates.forEach((c) => {
    //     console.log(c.distance + ' ' + `(${c.position.x}, ${c.position.y})`);
    // });

    candidates.forEach(c => {
        console.log(`${c.position.x} ${c.position.y} ${c.distance} ${c.steps}`);
    });
};

const run = (filename) => {
    const reader = createReader(filename);

    reader.on('line', (line) => onInputLine(line));
    reader.on('close', () => onClose());
};

module.exports.run = run;