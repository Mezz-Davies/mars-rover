import MarsRover from '../marsRover';

import { NORTH, EAST, SOUTH, WEST } from '../constants/directions';
import { LEFT, RIGHT, MOVE } from '../constants/commands';

const testGrid = { x: 10, y: 10 };
describe('rotateLeft', () => {
    it('should turn from N to W', () => {
        const testRover = new MarsRover(testGrid, 0, 0, NORTH);
        testRover.rotateLeft();
        expect(testRover.dir).toEqual(WEST);
    });

    it('should turn from S to E', () => {
        const testRover = new MarsRover(testGrid, 0, 0, SOUTH);
        testRover.rotateLeft();
        expect(testRover.dir).toEqual(EAST);
    });
});

describe('rotateRight', () => {
    it('should turn from W to N', () => {
        const testRover = new MarsRover(testGrid, 0, 0, WEST);
        testRover.rotateRight();
        expect(testRover.dir).toEqual(NORTH);
    });

    it('should turn from E to S', () => {
        const testRover = new MarsRover(testGrid, 0, 0, EAST);
        testRover.rotateRight();
        expect(testRover.dir).toEqual(SOUTH);
    });
});

describe('moveForward', () => {
    it('should move North', () => {
        const testRover = new MarsRover(testGrid, 5, 5, NORTH);
        testRover.moveForward();
        expect(testRover.y).toEqual(6);
    });
    it('should move East', () => {
        const testRover = new MarsRover(testGrid, 5, 5, EAST);
        testRover.moveForward();
        expect(testRover.x).toEqual(6);
    });
    it('should move South', () => {
        const testRover = new MarsRover(testGrid, 5, 5, SOUTH);
        testRover.moveForward();
        expect(testRover.y).toEqual(4);
    });
    it('should move West', () => {
        const testRover = new MarsRover(testGrid, 5, 5, WEST);
        testRover.moveForward();
        expect(testRover.x).toEqual(4);
    });
    it('should recognise unknown direction', () => {
        const testRover = new MarsRover(testGrid, 5, 5, 'WRONG_WAY');
        try {
            testRover.moveForward();
        } catch (err) {
            expect(err.message).toEqual(`Unknown direction: WRONG_WAY`);
        }
    });
    it('should fall off', () => {
        const testRover = new MarsRover(
            testGrid,
            testGrid.x,
            testGrid.y,
            NORTH
        );
        try {
            testRover.moveForward();
        } catch (err) {
            expect(err.message).toEqual(`fallen off plateau`);
        }
    });
});

describe('getPositionAndRotation', () => {
    it('should return correct values', () => {
        const testRover = new MarsRover(testGrid, 1, 1, 'N');
        expect(testRover.getPositionAndDirection()).toEqual('1 1 N');
    });
});

describe('processCommands', () => {
    it('should process commands and store correct history', () => {
        const testRover = new MarsRover(testGrid, 0, 0, 'N');
        testRover.processCommands([MOVE, RIGHT, MOVE, LEFT, MOVE]);
        expect(testRover.positionHistory).toEqual([
            '0 0 N',
            '0 1 N',
            '0 1 E',
            '1 1 E',
            '1 1 N',
        ]);
        expect(testRover.getPositionAndDirection()).toEqual('1 2 N');
    });
    it('should recognise unknown command', () => {
        const testRover = new MarsRover(testGrid, 0, 0, 'N');
        try {
            testRover.processCommands([MOVE, RIGHT, 'INVALID', LEFT, MOVE]);
        } catch (err) {
            expect(err.message).toEqual('Unknown command: INVALID');
        }
    });
});
