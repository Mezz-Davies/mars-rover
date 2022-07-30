import {
    isValidFileFormat,
    isValidCommand,
    isValidDirection,
} from '../validation.js';
import { NORTH } from '../constants/directions.js';
import { LEFT } from '../constants/commands.js';

describe('isValidCommand', () => {
    it('should return true if command is valid', () => {
        expect(isValidCommand(LEFT)).toEqual(true);
    });
    it('should return false if command is invalid', () => {
        expect(isValidCommand('INVALID')).toEqual(false);
    });
});

describe('isValidDirection', () => {
    it('should return true if direction is invalid', () => {
        expect(isValidDirection(NORTH)).toEqual(true);
    });
    it('should return false if direction is invalid', () => {
        expect(isValidDirection('INVALID')).toEqual(false);
    });
});

describe('isFileFormatValid', () => {
    it('should return true for valid file', () => {
        const testString = `5 5\r\n1 2 N\r\nLMLMLMLMM\r\n1 2 N\r\nLMLMLMLMM`;
        expect(isValidFileFormat(testString)).toEqual(true);
    });
    it('should return true for valid file - empty command string', () => {
        const testString = `5 5\r\n1 2 N\r\n\r\n1 2 N\r\nLMLMLMLMM`;
        expect(isValidFileFormat(testString)).toEqual(true);
    });
    it('should return true for valid file with digits larger than 9', () => {
        const testString = `10 10\r\n10 20 N\r\n\r\n10 20 N\r\nLMLMLMLMM`;
        expect(isValidFileFormat(testString)).toEqual(true);
    })
    it('should return false for invalid file - bad grid settings', () => {
        const testString = `a 5\r\n1 2 N\r\nLMLMLMLMM`;
        expect(isValidFileFormat(testString)).toEqual(false);
    });
    it('should return false for invalid file - bad rover settings', () => {
        const testString = `5 5\r\n1 2 R\r\nLMLMLMLMM`;
        expect(isValidFileFormat(testString)).toEqual(false);
    });
    it('should return false for invalid file - invalid rover command', () => {
        const testString = `5 5\r\n1 2 N\r\nNMLMLMLMM`;
        expect(isValidFileFormat(testString)).toEqual(false);
    });
});
