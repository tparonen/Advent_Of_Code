import fs from 'fs';
import _ from 'lodash';

import {AsteroidMap} from "./map";
import {Asteroid, AsteroidPosition, Vector2D} from "./asteroid";

const calculateRank = (position: AsteroidPosition, allPositions: AsteroidPosition[]) => {
    let rank = 0;
    allPositions.forEach((pos, idx) => {
        if (position.hasLineOfSight(pos)) {
            rank++;
        }
    });
    return rank;
};

type RankedPosition = {
    position: AsteroidPosition;
    rank: number;
}

const findBestLocationForStation = (positions: AsteroidPosition[]): RankedPosition | undefined => {
    const rankedPositions: RankedPosition[] = positions.map(pos => ({
        position: pos,
        rank: calculateRank(pos, positions)
    }));
    return _.maxBy(rankedPositions, (p) => p.rank);
};

const resolveAngle = (point: Vector2D) => {
    if (point.x >= 0) {
        return Math.asin(point.y);
    } else {
        return ((-3*Math.PI)/2) - Math.asin(point.y) + (Math.PI/2)
    }
};

const scannerSweep = (origin: AsteroidPosition, positions: AsteroidPosition[]): Record<string,AsteroidPosition> => {
    const sweptAsteroids: Record<string,AsteroidPosition> = {};

    const STEP_SIZE = Math.PI/1024;

    for (let angleInRadians = (Math.PI/2); angleInRadians > ((-3*Math.PI)/2); angleInRadians -= STEP_SIZE) {

        const tolerance = STEP_SIZE;
        const originPoint = origin.getAsteroid().position;

        positions.forEach(p => {
            const asteroidPoint = p.getAsteroid().position;
            const offsetAsteroidPoint = asteroidPoint.subtract(originPoint);
            const angle = resolveAngle(offsetAsteroidPoint.makeUnitVector().flipY());

            if (Math.abs(angle - angleInRadians) < tolerance) {
                if (origin.hasLineOfSight(p)) {
                    sweptAsteroids[p.getAsteroid().position.toString()] = p;
                }
            }
        });
    }

    return sweptAsteroids;
};

const processInput = async (input: string) => {
    const asteroidMap = AsteroidMap.fromSerializedMap(input);
    const positions = asteroidMap.getAsteroidPositions();
    console.log(positions.length);

    const bestLocation: RankedPosition | undefined = findBestLocationForStation(positions);

    if (bestLocation) {
        console.log('origin', bestLocation.position.getAsteroid().position);
        //const testBestPosition = new AsteroidPosition(asteroidMap, new Asteroid(8,3));
        const sweptAsteroidPositions = scannerSweep(bestLocation.position, positions);
        Object.keys(sweptAsteroidPositions).map((k, idx) => `${idx+1} ... ${k}`).forEach(text => console.log(text));
        console.log(Object.keys(sweptAsteroidPositions).length);
    }
};

export const run = (filename: string) => {
    fs.readFile(filename, 'utf8', async (err, data) => {
        if (err) {
            console.error(err);
            throw err;
        }
        await processInput(data);
    });
};