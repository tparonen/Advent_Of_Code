const readline = require('readline');

const MyReadLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

module.exports = MyReadLine;