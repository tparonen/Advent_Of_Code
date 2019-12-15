"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _map = require("./map");

var calculateRank = function calculateRank(position, allPositions) {
  var rank = 0;
  allPositions.forEach(function (pos, idx) {
    if (position.hasLineOfSight(pos)) {
      rank++;
    }
  });
  return rank;
};

var findBestLocationForStation = function findBestLocationForStation(positions) {
  var rankedPositions = positions.map(function (pos) {
    return {
      position: pos,
      rank: calculateRank(pos, positions)
    };
  });
  return _lodash["default"].maxBy(rankedPositions, function (p) {
    return p.rank;
  });
};

var resolveAngle = function resolveAngle(point) {
  if (point.x >= 0) {
    return Math.asin(point.y);
  } else {
    return -3 * Math.PI / 2 - Math.asin(point.y) + Math.PI / 2;
  }
};

var scannerSweep = function scannerSweep(origin, positions) {
  var sweptAsteroids = {};
  var STEP_SIZE = Math.PI / 1024;

  var _loop = function _loop(angleInRadians) {
    var tolerance = STEP_SIZE;
    var originPoint = origin.getAsteroid().position;
    positions.forEach(function (p) {
      var asteroidPoint = p.getAsteroid().position;
      var offsetAsteroidPoint = asteroidPoint.subtract(originPoint);
      var angle = resolveAngle(offsetAsteroidPoint.makeUnitVector().flipY());

      if (Math.abs(angle - angleInRadians) < tolerance) {
        if (origin.hasLineOfSight(p)) {
          sweptAsteroids[p.getAsteroid().position.toString()] = p;
        }
      }
    });
  };

  for (var angleInRadians = Math.PI / 2; angleInRadians > -3 * Math.PI / 2; angleInRadians -= STEP_SIZE) {
    _loop(angleInRadians);
  }

  return sweptAsteroids;
};

var processInput = function processInput(input) {
  var asteroidMap, positions, bestLocation, sweptAsteroidPositions;
  return _regenerator["default"].async(function processInput$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          asteroidMap = _map.AsteroidMap.fromSerializedMap(input);
          positions = asteroidMap.getAsteroidPositions();
          console.log(positions.length);
          bestLocation = findBestLocationForStation(positions);

          if (bestLocation) {
            console.log('origin', bestLocation.position.getAsteroid().position); //const testBestPosition = new AsteroidPosition(asteroidMap, new Asteroid(8,3));

            sweptAsteroidPositions = scannerSweep(bestLocation.position, positions);
            Object.keys(sweptAsteroidPositions).map(function (k, idx) {
              return "".concat(idx + 1, " ... ").concat(k);
            }).forEach(function (text) {
              return console.log(text);
            });
            console.log(Object.keys(sweptAsteroidPositions).length);
          }

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var run = function run(filename) {
  _fs["default"].readFile(filename, 'utf8', function _callee(err, data) {
    return _regenerator["default"].async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!err) {
              _context2.next = 3;
              break;
            }

            console.error(err);
            throw err;

          case 3:
            _context2.next = 5;
            return _regenerator["default"].awrap(processInput(data));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
};

exports.run = run;