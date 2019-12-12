const fs = require('fs');
const { flattenImage, renderImage } = require('./image');

const processInput = async (input) => {

    const layerWidth = 25;
    const layerHeight = 6;
    const layerSize = layerWidth * layerHeight;
    const numLayers = input.length / layerSize;

    const layers = getLayersAndMetaData(input, numLayers, layerSize);

    const image = flattenImage(layers);

    const renderedImage = renderImage(image, layerWidth, layerHeight);

    console.log(renderedImage);
};

const getLayersAndMetaData = (input, numLayers, layerSize) => {
    const layerCounts = [];
    for (let i = 0; i < numLayers; i++) {
        const startIndex = i * layerSize;
        const endIndex = startIndex + layerSize;
        const layer = input.slice(startIndex, endIndex);
        const counts = countDigits(layer);
        layerCounts.push({
            index: i,
            layer: layer,
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