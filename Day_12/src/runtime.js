const fs = require('fs');

const processInput = async (input) => {
    console.log('input', input);
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