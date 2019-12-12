exports.flattenImage = (layers) => {

    let image = '2'.repeat(layers[0].layer.length);
    const layersBackToFront = [...layers].reverse();

    for (let i = 0; i < layersBackToFront.length; i++) {
        const layer = layersBackToFront[i].layer;
        for (let j = 0; j < layer.length; j++) {
            const ch = layer.charAt(j);
            if (ch !== '2') {
                image = image.slice(0, j) + ch + image.slice(j+1);
            }
        }
    }

    return image;
};

exports.renderImage = (image, width, height) => {
    let renderedImage = '';
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const ch = image.charAt(y * width + x);
            if (ch === '0') {
                renderedImage += ' ';
            } else {
                renderedImage += '\u2588';
            }
        }
        renderedImage += '\n';
    }
    return renderedImage;
};