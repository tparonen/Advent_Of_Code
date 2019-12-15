import {AsteroidMap} from "./map";

const serializedMap = [
    '##..##',
    '..##..',
    '##..##'
].join('\n');

describe('asteroid', () => {

    test('Asteroid map returns a list of asteroids', () => {
        const asteroidMap = AsteroidMap.fromSerializedMap(serializedMap);
        expect(asteroidMap.getAsteroidPositions().length).toBe(10);
    });

    test('Asteroid has line of sight to another asteroid', () => {
        const asteroidMap = AsteroidMap.fromSerializedMap(serializedMap);
        const positions = asteroidMap.getAsteroidPositions();
        expect(positions[0].hasLineOfSight(positions[1])).toBeTruthy();
    });

    test('Asteroid does not have line of sight to another asteroid', () => {
        const asteroidMap = AsteroidMap.fromSerializedMap(serializedMap);
        const positions = asteroidMap.getAsteroidPositions();
        expect(positions[0].hasLineOfSight(positions[2])).toBeFalsy();
    });

    test('Asteroid does not have line of sight to itself', () => {
        const asteroidMap = AsteroidMap.fromSerializedMap(serializedMap);
        const positions = asteroidMap.getAsteroidPositions();
        expect(positions[0].hasLineOfSight(positions[0])).toBeFalsy();
    });

});