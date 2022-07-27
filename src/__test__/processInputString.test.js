import {
    parseToGridSettingsObject,
    getRoverStartSettings,
    processInputString,
} from '../processInputString';

describe('parseToGridSettingsObject', () => {
    it('should parse valid input correctly', () => {
        expect(parseToGridSettingsObject('10 10')).toEqual({ x: 10, y: 10 });
    });
    it('should throw error if invalid input received', () => {
        try {
            parseToGridSettingsObject('n a');
        } catch (err) {
            expect(err.message).toEqual(
                `cannot parse string 'n a' to valid gridSettings`
            );
        }
    });
});

describe('getRoverStartSettings', () => {
    it('should parse valid input correctly', () => {
        expect(getRoverStartSettings('0 0 N')).toEqual({
            startX: 0,
            startY: 0,
            startDir: 'N',
        });
    });
    it('should throw error if invalid input received', () => {
        try {
            getRoverStartSettings('a b c');
        } catch (err) {
            expect(err.message).toEqual(
                `cannot parse string 'a b c' to valid rover start settings`
            );
        }
    });
});

describe('processInputString', () => {
    it('should process string and return expected results', () => {
        const testString = '10 10\r\n1 2 N\r\nLMLMLMLMM';
        expect(processInputString(testString)).toEqual(['1 3 N']);
    });
});
