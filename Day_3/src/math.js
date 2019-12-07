const {Point} = require("./line-segment");

const forAllPointsInLine = (s, callback) => {
    if (s.p1.x !== s.p2.x) {
        for (let x = s.p1.x; x <= s.p2.x; x++) {
            callback({ x: x, y: s.p1.y });
        }
    } else {
        for (let y = s.p1.y; y <= s.p2.y; y++) {
            callback({ x: s.p1.x, y: y });
        }
    }
};

const bruteForceIntersection = (s1, s2) => {
    forAllPointsInLine(s1, (s1p) => {
        forAllPointsInLine(s2, (s2p) => {
            if (s1p.x === s2p.x && s1p.y === s2p.y) {
                return { x: s1p.x, y: s1p.y };
            }
        });
    });
};

const isHorizontal = (segment) => {
    return segment.p1.x !== segment.p2.x;
};

const isVertical = (segment) => {
    return segment.p1.y !== segment.p2.y;
};

const isBetween = (value, a, b) => {
    if (a > b) {
        return value >= b && value <= a;
    } else {
        return value >= a && value <= b;
    }
};

const checkIntersection = (h, v) => {
    const foundIt = isBetween(h.p1.y, v.p1.y, v.p2.y) && isBetween(v.p1.x, h.p1.x, h.p2.x);

    if (foundIt) {
        return { x: v.p1.x, y: h.p1.y };
    }
    return false;
};

const intersects = (s1, s2) => {
    if ((isHorizontal(s1) && isHorizontal(s2)) || (isVertical(s1) && isVertical(s2))) {
        return false;
    }
    return isHorizontal(s1) ? checkIntersection(s1, s2) : checkIntersection(s2, s1);
};

module.exports.findIntersections = (gridOne, gridTwo) => {
    const intersections = [];
    gridOne.lineSegments.forEach((s1, gridIndex1) => {
        gridTwo.lineSegments.forEach((s2, gridIndex2) => {
            const intersection = intersects(s1, s2);
            if (intersection) {
                intersections.push({ ...intersection, gridIndex1, gridIndex2 });
            }
        });
    });
    return intersections;
};

module.exports.calculateManhattanDistance = (point) => {
    return Math.abs(point.x) + Math.abs(point.y);
};

const calculateSegmentLength = (segment) => {
    if (segment.p1.x !== segment.p2.x) {
        return segment.p1.x > segment.p2.x ? segment.p1.x - segment.p2.x : segment.p2.x - segment.p1.x;
    } else {
        return segment.p1.y > segment.p2.y ? segment.p1.y - segment.p2.y : segment.p2.y - segment.p1.y;
    }
};

const calculateGridSteps = (grid, gridIndex, intersection) => {
    const visited = {};
    let totalLength = 0;
    for (let i = 0; i <= gridIndex; i++) {
        const segment = grid.lineSegments[i];
        const segmentKey = `${segment.p2.x}_${segment.p2.y}`;
        if (visited[segmentKey]) {
            const { lengthSoFar } = visited[segmentKey];
            totalLength = lengthSoFar;
        } else if (i === gridIndex) {
            const len = calculateSegmentLength({ p1: segment.p1, p2: { x: intersection.x, y: intersection.y } });
            totalLength += len;
        } else {
            const len = calculateSegmentLength(segment);
            totalLength += len;
            visited[segmentKey] = { lengthSoFar: totalLength };
        }
    }
    return totalLength;
};

module.exports.calculateSteps = (gridOne, gridTwo, intersection) => {
    const { x, y, gridIndex1, gridIndex2 } = intersection;
    //console.log(x, y, gridIndex1, gridIndex2);

    const gridOneSteps = calculateGridSteps(gridOne, gridIndex1, intersection);
    const gridTwoSteps = calculateGridSteps(gridTwo, gridIndex2, intersection);

    return gridOneSteps + gridTwoSteps;
};