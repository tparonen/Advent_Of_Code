const Color = {
    Black: 'black',
    White: 'white'
};

const Direction = {
    North: 'North',
    East: 'East',
    South: 'South',
    West: 'West'
};

const TurnDirection = {
    Left: 'Left',
    Right: 'Right'
};

const Command = {
    PaintBlack: 'paint_black',
    PaintWhite: 'paint_white',
    TurnLeftAndMove: 'turn_left_and_move',
    TurnRightAndMove: 'turn_right_and_move'
};

module.exports = class Robot {

    constructor() {
        this.__position = {x: 0, y: 0};
        this.__tiles = {};
        this.__facing = Direction.North;

        this.__enterTile();
    }

    get __currentTile() {
        return this.__tiles[`${this.__position.x}__${this.__position.y}`];
    }

    __resolveTileKey(position) {
        return `${position.x}__${position.y}`;
    }

    __createTile(position) {
        return { position, color: Color.Black, visits: 0, paints: 0 };
    }

    __paint(color) {
        this.__currentTile.color = color;
        this.__currentTile.paints++;
    }

    __turn(turnDirection) {
        const directive = this.__facing + '_' + turnDirection;
        switch (directive) {
            case 'North_Left':
            case 'South_Right': {
                this.__facing = Direction.West;
                break;
            }
            case 'North_Right':
            case 'South_Left': {
                this.__facing = Direction.East;
                break;
            }
            case 'West_Right':
            case 'East_Left': {
                this.__facing = Direction.North;
                break;
            }
            case 'West_Left':
            case 'East_Right': {
                this.__facing = Direction.South;
                break;
            }
        }
    }

    __moveForward() {
        const { position } = this.__currentTile;
        switch (this.__facing) {
            case Direction.North: {
                this.__position = {x: position.x, y: position.y - 1};
                break;
            }
            case Direction.East: {
                this.__position = {x: position.x + 1, y: position.y};
                break;
            }
            case Direction.South: {
                this.__position = {x: position.x, y: position.y + 1};
                break;
            }
            case Direction.West: {
                this.__position = {x: position.x - 1, y: position.y};
                break;
            }
        }
    }

    __enterTile() {
        const tileKey = this.__resolveTileKey(this.__position);
        if (!this.__tiles[tileKey]) {
            this.__tiles[tileKey] = this.__createTile(this.__position);
        }
        this.__tiles[tileKey].visits++;
    }

    __turnLeftAndMove() {
        this.__turn(TurnDirection.Left);
        this.__moveForward();
        this.__enterTile();
    }

    __turnRightAndMove() {
        this.__turn(TurnDirection.Right);
        this.__moveForward();
        this.__enterTile();
    }

    scanColor() {
        switch (this.__currentTile.color) {
            case Color.Black: return 0;
            case Color.White: return 1;
            default: throw new Error('Invalid color: ' + this.__currentTile.color);
        }
    }

    execute(commands) {
        commands.forEach(cmd => {
            switch (cmd) {
                case Command.PaintBlack: {
                    this.__paint(Color.Black);
                    break;
                }
                case Command.PaintWhite: {
                    this.__paint(Color.White);
                    break;
                }
                case Command.TurnLeftAndMove: {
                    this.__turnLeftAndMove();
                    break;
                }
                case Command.TurnRightAndMove: {
                    this.__turnRightAndMove();
                    break;
                }
            }
        });
    }

};

module.exports.Color = Color;
module.exports.Direction = Direction;
module.exports.TurnDirection = TurnDirection;
module.exports.Command = Command;