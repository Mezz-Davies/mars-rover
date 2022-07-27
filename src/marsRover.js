import {
    NORTH,
    EAST,
    SOUTH,
    WEST,
    DIRECTIONS,
} from './constants/directions.js';
import { LEFT, RIGHT, MOVE } from './constants/commands.js';
export default class MarsRover {
    constructor(gridSize, startX, startY, startDir) {
        this.gridSize = gridSize;
        this.x = startX;
        this.y = startY;
        this.dir = startDir;
        this.positionHistory = [];
    }

    rotateLeft() {
        const newDirIndex =
            DIRECTIONS.indexOf(this.dir) - 1 < 0
                ? DIRECTIONS.length - 1
                : DIRECTIONS.indexOf(this.dir) - 1;
        this.dir = DIRECTIONS[newDirIndex];
    }

    rotateRight() {
        const newDirIndex =
            DIRECTIONS.indexOf(this.dir) + 1 >= DIRECTIONS.length
                ? 0
                : DIRECTIONS.indexOf(this.dir) + 1;
        this.dir = DIRECTIONS[newDirIndex];
    }

    moveForward() {
        switch (this.dir) {
            case NORTH:
                this.y++;
                break;
            case EAST:
                this.x++;
                break;
            case SOUTH:
                this.y--;
                break;
            case WEST:
                this.x--;
                break;
            default:
                throw new Error(`Unknown direction: ${this.dir}`);
        }
        if (this.x > this.gridSize.x || this.y > this.gridSize.y) {
            throw new Error(`fallen off plateau`);
        }
    }

    processCommands(commandsArray) {
        commandsArray.forEach((command) => {
            this.positionHistory.push(this.getPositionAndDirection());
            switch (command) {
                case LEFT:
                    this.rotateLeft();
                    break;
                case RIGHT:
                    this.rotateRight();
                    break;
                case MOVE:
                    this.moveForward();
                    break;
                default:
                    throw new Error(`Unknown command: ${command}`);
            }
        });
    }

    getPositionAndDirection() {
        return `${this.x} ${this.y} ${this.dir}`;
    }
}
