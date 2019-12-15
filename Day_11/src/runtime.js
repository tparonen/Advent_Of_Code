const Robot = require('./robot');

const fs = require('fs');
const Program = require("./program");

const outputNumberToCommand = (num, idx) => {
    if (idx === 0 && num === 0) {
        return Robot.Command.PaintBlack;
    }
    if (idx === 0 && num === 1) {
        return Robot.Command.PaintWhite;
    }
    if (idx === 1 && num === 0) {
        return Robot.Command.TurnLeftAndMove;
    }
    if (idx === 1 && num === 1) {
        return Robot.Command.TurnRightAndMove;
    }
};

const toScreenCoordinates = ({x, y}, {originX, originY}) => {
    return { x: x - originX, y: y - originY };
};

const toWorldCoordinates = ({x, y}, {originX, originY}) => {
    return { x: x + originX, y: y + originY };
};

const processInput = async (input) => {

    // Initialization of Robot
    const program = new Program(input);
    const robot = new Robot();

    // Start the program
    let params = [1];
    let output = await program.start(params);

    // Process program output
    const commands = output.map(outputNumberToCommand);
    robot.execute(commands);

    while (!program.terminated) {

        // Resume the program
        params = [robot.scanColor()];
        output = await program.resume(params);

        // Process program output
        const commands = output.map(outputNumberToCommand);
        robot.execute(commands);

    }

    const tiles = Object.keys(robot.__tiles).map(k => robot.__tiles[k]);

    const minX = tiles.map(t => t.position.x).reduce((x1, x2) => Math.min(x1, x2));
    const minY = tiles.map(t => t.position.y).reduce((y1, y2) => Math.min(y1, y2));

    const maxX = tiles.map(t => t.position.x).reduce((x1, x2) => Math.max(x1, x2));
    const maxY = tiles.map(t => t.position.y).reduce((y1, y2) => Math.max(y1, y2));

    let image = '';
    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            if (robot.__tiles[`${x}__${y}`]) {
                image += robot.__tiles[`${x}__${y}`].color === Robot.Color.Black ? ' ' : '\u2588';
            } else {
                image += ' ';
            }
        }
        image += '\n';
    }
    console.log(image);
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