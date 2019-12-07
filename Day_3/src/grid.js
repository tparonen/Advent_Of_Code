const {Point, LineSegment} = require('./line-segment');

const addPoints = (p1, p2) => {
    return new Point(p1.x + p2.x, p1.y + p2.y);
};

class Grid {
    constructor() {
        this.lineSegments = [];
        this.position = new Point(0, 0);
    }

    addToPath(point) {
        const p1 = this.position;
        const p2 = addPoints(this.position, point);
        const lineSegment = new LineSegment(p1, p2);

        this.lineSegments.push(lineSegment);
        this.position = new Point(p2.x, p2.y);
    }

    toString() {
        return this.lineSegments.reduce((str, segment) => {
            return `${str} ${segment.toString()}`;
        }, '')
    }
}

module.exports.Grid = Grid;