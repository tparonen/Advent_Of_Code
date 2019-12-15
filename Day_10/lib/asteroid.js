"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsteroidPosition = exports.Asteroid = exports.Vector2D = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Vector2D =
/*#__PURE__*/
function () {
  function Vector2D(x, y) {
    (0, _classCallCheck2["default"])(this, Vector2D);
    (0, _defineProperty2["default"])(this, "x", void 0);
    (0, _defineProperty2["default"])(this, "y", void 0);
    this.x = x;
    this.y = y;
  }

  (0, _createClass2["default"])(Vector2D, [{
    key: "getLength",
    value: function getLength() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }, {
    key: "makeUnitVector",
    value: function makeUnitVector() {
      var length = this.getLength();
      return new Vector2D(this.x / length, this.y / length);
    }
  }, {
    key: "flipY",
    value: function flipY() {
      return new Vector2D(this.x, -1 * this.y);
    }
  }, {
    key: "equalsTo",
    value: function equalsTo(other) {
      return this.x === other.x && this.y === other.y;
    }
  }, {
    key: "add",
    value: function add(other) {
      return new Vector2D(this.x + other.x, this.y + other.y);
    }
  }, {
    key: "subtract",
    value: function subtract(other) {
      return new Vector2D(this.x - other.x, this.y - other.y);
    }
  }, {
    key: "calculateDelta",
    value: function calculateDelta(other) {
      if (this.equalsTo(other)) {
        return new Vector2D(0, 0);
      }

      var delta = this.subtract(other);
      var lengthX = Math.abs(delta.x);
      var lengthY = Math.abs(delta.y);
      var divisor = Vector2D.findGreatestCommonDivisor(lengthX, lengthY);

      if (delta.x === 0) {
        return new Vector2D(0, delta.y / lengthY);
      }

      if (delta.y === 0) {
        return new Vector2D(delta.x / lengthX, 0);
      }

      return new Vector2D(delta.x / divisor, delta.y / divisor);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "(".concat(this.x, ", ").concat(this.y, ")");
    }
  }], [{
    key: "findGreatestCommonDivisor",
    value: function findGreatestCommonDivisor(a, b) {
      var lengthA = Math.abs(a);
      var lengthB = Math.abs(b);
      var larger = lengthA >= lengthB ? lengthA : lengthB;
      var smaller = lengthA < lengthB ? lengthA : lengthB;

      while (true) {
        if (smaller === 0) {
          return larger;
        }

        larger = larger % smaller;

        if (larger === 0) {
          return smaller;
        }

        smaller = smaller % larger;
      }
    }
  }]);
  return Vector2D;
}();

exports.Vector2D = Vector2D;

var Asteroid = function Asteroid(x, y) {
  (0, _classCallCheck2["default"])(this, Asteroid);
  (0, _defineProperty2["default"])(this, "position", void 0);
  this.position = new Vector2D(x, y);
};

exports.Asteroid = Asteroid;

var AsteroidPosition =
/*#__PURE__*/
function () {
  function AsteroidPosition(asteroidMap, asteroid) {
    (0, _classCallCheck2["default"])(this, AsteroidPosition);
    (0, _defineProperty2["default"])(this, "asteroidMap", void 0);
    (0, _defineProperty2["default"])(this, "asteroid", void 0);
    this.asteroidMap = asteroidMap;
    this.asteroid = asteroid;
  }

  (0, _createClass2["default"])(AsteroidPosition, [{
    key: "getAsteroid",
    value: function getAsteroid() {
      return this.asteroid;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.asteroid.position.toString();
    }
  }, {
    key: "findAllPositionsInTrajectoryTo",
    value: function findAllPositionsInTrajectoryTo(otherPosition) {
      var asteroidA = this.getAsteroid();
      var asteroidB = otherPosition.getAsteroid();
      var delta = asteroidB.position.calculateDelta(asteroidA.position);

      if (asteroidA.position.equalsTo(new Vector2D(0, 8))) {//console.log('--------');
        //console.log('delta', delta);
      }

      var result = [];

      for (var position = asteroidA.position;; position = position.add(delta)) {
        var asteroidPosition = this.asteroidMap.getAsteroidPositionAt(position.x, position.y);

        if (asteroidPosition !== null) {
          result.push(asteroidPosition);
        }

        if (position.equalsTo(asteroidB.position)) {
          break;
        }
      }

      return result;
    }
  }, {
    key: "hasLineOfSight",
    value: function hasLineOfSight(other) {
      var linePositions = this.findAllPositionsInTrajectoryTo(other); // if (linePositions.length === 2 && this.asteroid.position.equalsTo(new Vector2D(0,8))) {
      //     console.log('linePositions', linePositions.map(lp => lp.toString()));
      // }

      return linePositions.length === 2;
    }
  }]);
  return AsteroidPosition;
}();

exports.AsteroidPosition = AsteroidPosition;