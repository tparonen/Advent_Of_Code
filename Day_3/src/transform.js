const {Point} = require('./line-segment');

module.exports.transformMoveToPoint = (move) => {
    const direction = move.charAt(0);
    const magnitude = move.slice(1);
    switch (direction) {
        case 'U':
            return new Point(0, parseInt(magnitude, 10));
        case 'R':
            return new Point(parseInt(magnitude, 10), 0);
        case 'D':
            return new Point(0, -1 * parseInt(magnitude, 10));
        case 'L':
            return new Point(-1 * parseInt(magnitude, 10), 0);
    }
};