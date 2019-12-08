const fs = require('fs');

const processInput = async (input) => {

    const layerWidth = 25;
    const layerHeight = 6;
    const layerSize = layerWidth * layerHeight;
    const numLayers = input.length / layerSize;

    console.log('Layers count', numLayers);

    const digitCounts = countDigitsInLayers(input, numLayers, layerSize);

    let lowest = digitCounts[0];
    digitCounts.forEach((count) => {
        if (count.counts['0'] < lowest.counts['0']) {
            lowest = count;
        }
    });
    console.log('digitCounts', digitCounts);
    console.log('lowest', lowest);

};

const countDigitsInLayers = (input, numLayers, layerSize) => {
    const layerCounts = [];
    for (let i = 0; i < numLayers; i++) {
        const startIndex = i * layerSize;
        const endIndex = startIndex + layerSize;
        const layer = input.slice(startIndex, endIndex);
        const counts = countDigits(layer);
        layerCounts.push({
            index: i,
            counts: counts
        });
    }
    return layerCounts;
};

const countDigits = (layer) => {
    let counts = {};
    for (let i = 0; i < layer.length; i++) {
        const ch = layer.charAt(i);
        if (counts[ch] === undefined) {
            counts[ch] = 0;
        }
        counts[ch]++;
    }
    return counts;
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