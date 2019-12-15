import {Asteroid, AsteroidPosition, Vector2D} from "./asteroid";

export enum GridCellType {
    Empty,
    Asteroid
}

export class GridCell {
    public type: GridCellType;
    public position: Vector2D;

    constructor(type: GridCellType, position: Vector2D) {
        this.type = type;
        this.position = position;
    }

    public toAsteroidPosition(map: AsteroidMap): AsteroidPosition {
        return new AsteroidPosition(map, new Asteroid(this.position.x, this.position.y));
    }
}

export class AsteroidMap {

    private grid: GridCell[];

    private constructor(grid: GridCell[]) {
        this.grid = grid;
    }

    private static resolveGridCellType(serializedCell: string) {
        switch (serializedCell) {
            case '.':
                return GridCellType.Empty;
            case '#':
                return GridCellType.Asteroid;
            default:
                return GridCellType.Empty;
        }
    }

    static fromSerializedMap(serializedMap: string) {
        const grid: GridCell[] = [];
        const rows = serializedMap.split('\n');
        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            const cols = rows[rowIndex];
            for (let colIndex = 0; colIndex < cols.length; colIndex++) {
                const column = cols[colIndex];
                grid.push(new GridCell(
                    this.resolveGridCellType(column),
                    new Vector2D(colIndex, rowIndex)
                ));
            }
        }
        return new AsteroidMap(grid);
    }

    getAsteroidPositions(): AsteroidPosition[] {
        return this.grid.filter(cell => cell.type === GridCellType.Asteroid).map(cell => cell.toAsteroidPosition(this));
    }

    getAsteroidPositionAt(x: number, y: number): AsteroidPosition | null {
        const asteroidCell = this.grid.find(cell => (
            cell.position.x === x &&
            cell.position.y === y &&
            cell.type === GridCellType.Asteroid
        ));
        if (asteroidCell) {
            return asteroidCell.toAsteroidPosition(this);
        }
        return null;
    }
}