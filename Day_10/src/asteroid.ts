import {AsteroidMap} from "./map";

export class Vector2D {

    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public equalsTo(other: Vector2D): boolean {
        return this.x === other.x && this.y === other.y;
    }

    public add(other: Vector2D): Vector2D {
        return new Vector2D(this.x + other.x, this.y + other.y);
    }

    public subtract(other: Vector2D): Vector2D {
        return new Vector2D(this.x - other.x, this.y - other.y);
    }

    public calculateDelta(other: Vector2D): Vector2D {
        const delta = other.subtract(this);
        if (delta.x === 0) {
            return new Vector2D(0, 1);
        }
        if (delta.y === 0) {
            return new Vector2D(1, 0);
        }
        if ((delta.x < delta.y) && (delta.y % delta.x === 0)) {
            return new Vector2D(delta.x, delta.y / delta.x);
        }
        if ((delta.y < delta.x) && (delta.x % delta.y === 0)) {
            return new Vector2D(delta.x / delta.y, delta.y);
        }
        return delta;
    }
}

export class Asteroid {

    public position: Vector2D;

    constructor(x: number, y: number) {
        this.position = new Vector2D(x, y);
    }
}

export class AsteroidPosition {

    private asteroidMap: AsteroidMap;
    private asteroid: Asteroid;

    constructor(asteroidMap: AsteroidMap, asteroid: Asteroid) {
        this.asteroidMap = asteroidMap;
        this.asteroid = asteroid;
    }

    public getAsteroid() {
        return this.asteroid;
    }

    toString() {
        return this.asteroid.position;
    }

    private findAllPositionsInTrajectoryTo(otherPosition: AsteroidPosition): AsteroidPosition[] {
        const asteroidA = this.getAsteroid();
        const asteroidB = otherPosition.getAsteroid();

        const delta = asteroidA.position.calculateDelta(asteroidB.position);

        const result: AsteroidPosition[] = [];
        for (let position = asteroidA.position;;position = position.add(delta)) {
            const asteroidPosition = this.asteroidMap.getAsteroidPositionAt(position.x, position.y);
            if (asteroidPosition !== null) {
                result.push(asteroidPosition);
            }
            if (position.equalsTo(asteroidB.position)) {
                break;
            }
        }
        return result;
    }

    hasLineOfSight(other: AsteroidPosition): boolean {
        const linePositions = this.findAllPositionsInTrajectoryTo(other);
        return linePositions.length === 2;
    }
}