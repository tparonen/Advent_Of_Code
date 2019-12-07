class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `(${this.x},${this.y})`
    }
}

class LineSegment {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    toString() {
        return `[${this.p1.toString()},${this.p2.toString()}]`
    }
}

module.exports.Point = Point;
module.exports.LineSegment = LineSegment;