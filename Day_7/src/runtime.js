const fs = require('fs');
const Program = require("./program");
const comb = require('js-combinatorics');

const tryPhaseSettingSequence = async (input, sequence) => {
    let inputSignal = 0;
    let outputArgs = [];
    let cycleNumber = 0;

    const programs = sequence.map(() => new Program(input));

    while (programs.some(prog => !prog.terminated)) {
        //console.log('starting cycle number ' + cycleNumber);
        for (let i = 0; i < sequence.length; i++) {
            const phaseSetting = sequence[i];
            const program = programs[i];
            if (cycleNumber === 0) {
                outputArgs = await program.execute([phaseSetting, inputSignal]);
            } else {
                outputArgs = await program.execute([inputSignal]);
            }
            console.log('out', outputArgs);
            inputSignal = outputArgs[0];
        }
        cycleNumber++;
    }
    return outputArgs[0];
};

const findAllPhaseSettingSequences = () => {
    const sequenceCodes = [5,6,7,8,9];
    return comb.permutation(sequenceCodes).toArray();
};

const processInput = async (input) => {

    const phaseSettingSequences = findAllPhaseSettingSequences();

    let bestSequence = null;

    for (let i = 0; i < phaseSettingSequences.length; i++) {
        const sequence = phaseSettingSequences[i];
        const output = await tryPhaseSettingSequence(input, sequence);

        //console.log('Phase setting: ', sequence, 'Output: ', output);
        if (!bestSequence || output > bestSequence.output) {
            bestSequence = { sequence, output };
        }
    }

    console.log('Best sequence', bestSequence);
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