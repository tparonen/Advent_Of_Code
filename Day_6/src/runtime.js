const fs = require('fs');
const Program = require("./program");

const processInput = async (input) => {
    const params = input.split(',');
    const program = new Program(params.join(','));

    await program.execute()
};

const run = (filename) => {
    fs.readFile(filename, 'utf8', async (err, data) => {
        if (err) {
            console.error(err);
            throw err;
        }
        processInput(data);
    });
};

module.exports.run = run;