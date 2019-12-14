import fs from 'fs';
import {AsteroidMap} from "./map";
import {AsteroidPosition} from "./asteroid";

const calculateRank = (position: AsteroidPosition, allPositions: AsteroidPosition[]) => {
    let rank = 0;
    allPositions.forEach(pos => {
        if (position.hasLineOfSight(pos)) {
            rank++;
        }
    });
    return rank;
};

const processInput = async (input: string) => {
    const asteroidMap = AsteroidMap.fromSerializedMap(input);
    const positions = asteroidMap.getAsteroidPositions();
    const ranks = positions.map(pos => calculateRank(pos, positions))

    console.log('ranks', ranks);
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