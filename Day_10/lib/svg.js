"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawAsteroidMapToSvg = void 0;

var d3 = _interopRequireWildcard(require("d3"));

var _jsdom = require("jsdom");

var dom = new _jsdom.JSDOM();

var drawAsteroidMapToSvg = function drawAsteroidMapToSvg(asteroidMap) {
  var body = d3.select(dom.window.document.body);
  var svg = body.append('svg');
  var node = body.node();
};

exports.drawAsteroidMapToSvg = drawAsteroidMapToSvg;