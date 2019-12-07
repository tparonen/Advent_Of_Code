const fs = require('fs');
const Program = require("./program");

const processInput = (input) => {
    //const program = new Program(input);
    //const retval = program.execute();

    const baseParams = input.split(',');

    for (let noun = 0; noun <= 99; noun++) {
        for (let verb = 0; verb <= 99; verb++) {
            const params = [ ...baseParams ];
            params[1] = noun;
            params[2] = verb;
            const program = new Program(params.join(','));
            const retval = program.execute();

            if (retval === 19690720) {
                console.log(`The noun is ${noun} and the verb is ${verb}`);
                console.log(`The answer to the puzzle is ${(100 * noun) + verb}`);
            }
        }
    }
};

const run = (filename) => {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            throw err;
        }
        processInput(data);
    });
};

module.exports.run = run;