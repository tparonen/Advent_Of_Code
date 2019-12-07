const {validatePassword} = require("./validator");

const run = () => {

    const rangeStart = 123257;
    const rangeEnd = 647015;

    let counter = 0;
    for (let n = rangeStart; n <= rangeEnd; n++) {
        if (validatePassword(n)) {
            counter++;
        }
    }

    console.log('Number of valid passwords', counter);
};

module.exports.run = run;