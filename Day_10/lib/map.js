"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsteroidMap = exports.GridCell = exports.GridCellType = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asteroid = require("./asteroid");

var GridCellType;
exports.GridCellType = GridCellType;

(function (GridCellType) {
  GridCellType[GridCellType["Empty"] = 0] = "Empty";
  GridCellType[GridCellType["Asteroid"] = 1] = "Asteroid";
})(GridCellType || (exports.GridCellType = GridCellType = {}));

var GridCell =
/*#__PURE__*/
function () {
  function GridCell(type, position) {
    (0, _classCallCheck2["default"])(this, GridCell);
    (0, _defineProperty2["default"])(this, "type", void 0);
    (0, _defineProperty2["default"])(this, "position", void 0);
    this.type = type;
    this.position = position;
  }

  (0, _createClass2["default"])(GridCell, [{
    key: "toAsteroidPosition",
    value: function toAsteroidPosition(map) {
      return new _asteroid.AsteroidPosition(map, new _asteroid.Asteroid(this.position.x, this.position.y));
    }
  }]);
  return GridCell;
}();

exports.GridCell = GridCell;

var AsteroidMap =
/*#__PURE__*/
function () {
  function AsteroidMap(grid) {
    (0, _classCallCheck2["default"])(this, AsteroidMap);
    (0, _defineProperty2["default"])(this, "grid", void 0);
    this.grid = grid;
  }

  (0, _createClass2["default"])(AsteroidMap, [{
    key: "getAsteroidPositions",
    value: function getAsteroidPositions() {
      var _this = this;

      return this.grid.filter(function (cell) {
        return cell.type === GridCellType.Asteroid;
      }).map(function (cell) {
        return cell.toAsteroidPosition(_this);
      });
    }
  }, {
    key: "getAsteroidPositionAt",
    value: function getAsteroidPositionAt(x, y) {
      var asteroidCell = this.grid.find(function (cell) {
        return cell.position.x === x && cell.position.y === y && cell.type === GridCellType.Asteroid;
      });

      if (asteroidCell) {
        return asteroidCell.toAsteroidPosition(this);
      }

      return null;
    }
  }], [{
    key: "resolveGridCellType",
    value: function resolveGridCellType(serializedCell) {
      switch (serializedCell) {
        case '.':
          return GridCellType.Empty;

        case '#':
          return GridCellType.Asteroid;

        default:
          return GridCellType.Empty;
      }
    }
  }, {
    key: "fromSerializedMap",
    value: function fromSerializedMap(serializedMap) {
      var grid = [];
      var rows = serializedMap.split('\n');

      for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        var cols = rows[rowIndex];

        for (var colIndex = 0; colIndex < cols.length; colIndex++) {
          var column = cols[colIndex];
          grid.push(new GridCell(this.resolveGridCellType(column), new _asteroid.Vector2D(colIndex, rowIndex)));
        }
      }

      return new AsteroidMap(grid);
    }
  }]);
  return AsteroidMap;
}();

exports.AsteroidMap = AsteroidMap;