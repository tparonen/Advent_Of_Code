"use strict";

var _map = require("./map");

var serializedMap = ['##..##', '..##..', '##..##'].join('\n');
describe('asteroid', function () {
  test('Asteroid map returns a list of asteroids', function () {
    var asteroidMap = _map.AsteroidMap.fromSerializedMap(serializedMap);

    expect(asteroidMap.getAsteroidPositions().length).toBe(10);
  });
  test('Asteroid has line of sight to another asteroid', function () {
    var asteroidMap = _map.AsteroidMap.fromSerializedMap(serializedMap);

    var positions = asteroidMap.getAsteroidPositions();
    expect(positions[0].hasLineOfSight(positions[1])).toBeTruthy();
  });
  test('Asteroid does not have line of sight to another asteroid', function () {
    var asteroidMap = _map.AsteroidMap.fromSerializedMap(serializedMap);

    var positions = asteroidMap.getAsteroidPositions();
    expect(positions[0].hasLineOfSight(positions[2])).toBeFalsy();
  });
  test('Asteroid does not have line of sight to itself', function () {
    var asteroidMap = _map.AsteroidMap.fromSerializedMap(serializedMap);

    var positions = asteroidMap.getAsteroidPositions();
    expect(positions[0].hasLineOfSight(positions[0])).toBeFalsy();
  });
});