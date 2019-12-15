import {AsteroidMap} from "./map";

export class Vector2D {

    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public getLength(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public makeUnitVector(): Vector2D {
        const length = this.getLength();
        return new Vector2D(this.x / length, this.y / length);
    }

    public flipY(): Vector2D {
        return new Vector2D(this.x, -1 * this.y);
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

    private static findGreatestCommonDivisor(a: number, b: number) {
        const lengthA = Math.abs(a);
        const lengthB = Math.abs(b);

        let larger = lengthA >= lengthB ? lengthA : lengthB;
        let smaller = lengthA < lengthB ? lengthA : lengthB;

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

    public calculateDelta(other: Vector2D): Vector2D {
        if (this.equalsTo(other)) {
            return new Vector2D(0, 0);
        }
        const delta = this.subtract(other);

        const lengthX = Math.abs(delta.x);
        const lengthY = Math.abs(delta.y);

        const divisor = Vector2D.findGreatestCommonDivisor(lengthX, lengthY);

        if (delta.x === 0) {
            return new Vector2D(0, delta.y / lengthY);
        }
        if (delta.y === 0) {
            return new Vector2D(delta.x / lengthX, 0);
        }
        return new Vector2D(delta.x / divisor, delta.y / divisor);
    }

    public toString() {
        return `(${this.x}, ${this.y})`
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
        return this.asteroid.position.toString();
    }

    private findAllPositionsInTrajectoryTo(otherPosition: AsteroidPosition): AsteroidPosition[] {
        const asteroidA = this.getAsteroid();
        const asteroidB = otherPosition.getAsteroid();

        const delta = asteroidB.position.calculateDelta(asteroidA.position);

        if (asteroidA.position.equalsTo(new Vector2D(0,8))) {
            //console.log('--------');
            //console.log('delta', delta);
        }

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
        // if (linePositions.length === 2 && this.asteroid.position.equalsTo(new Vector2D(0,8))) {
        //     console.log('linePositions', linePositions.map(lp => lp.toString()));
        // }
        return linePositions.length === 2;
    }
}