"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _fs = _interopRequireDefault(require("fs"));

var processInput = function processInput(input) {
  return _regenerator["default"].async(function processInput$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(input);

        case 1:
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