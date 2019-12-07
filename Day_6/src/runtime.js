const fs = require('fs');
const checksum = require('./checksum');

const processInput = (input) => {
    const lines = input.split('\n');
    lines.forEach(orbitMapEntry => {
        if (orbitMapEntry) {
            checksum.feed(orbitMapEntry);
        }
    });
    const totalTransfers = checksum.calculate();
    console.log('totalTransfers', totalTransfers);
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