import MarsRover from './marsRover.js';
import { isValidDirection } from './validation.js';

export const parseToGridSettingsObject = (inputString) => {
    const [x, y] = inputString.split(' ').map((val) => parseInt(val));
    if (isNaN(x) || isNaN(y)) {
        throw new Error(
            `cannot parse string '${inputString}' to valid gridSettings`
        );
    }
    return { x, y };
};

export const getRoverStartSettings = (inputString) => {
    const [startX, startY, startDir] = inputString
        .split(' ')
        .map((val, index, arr) =>
            index !== arr.length - 1 ? parseInt(val) : val
        );
    if (isNaN(startX) || isNaN(startY) || !isValidDirection(startDir)) {
        throw new Error(
            `cannot parse string '${inputString}' to valid rover start settings`
        );
    }
    return { startX, startY, startDir };
};

export const processInputString = (rawInputString) => {
    const [gridSettingsString, ...rovers] = rawInputString.split('\r\n');
    const gridSettingsObject = parseToGridSettingsObject(gridSettingsString);

    const positionResults = [];
    for (let i = 0; i < rovers.length; i += 2) {
        const { startX, startY, startDir } = getRoverStartSettings(rovers[i]);
        const rover = new MarsRover(
            gridSettingsObject,
            startX,
            startY,
            startDir
        );
        const commandsArray = rovers[i + 1].split('');
        rover.processCommands(commandsArray);
        positionResults.push(rover.getPositionAndDirection());
    }
    return positionResults;
};
