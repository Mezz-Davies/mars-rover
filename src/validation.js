import { DIRECTIONS } from './constants/directions.js';
import { VALID_COMMANDS } from './constants/commands.js';

const gridSettingsValidationRegex = new RegExp(/^\d \d$/);
const roverSetupValidationRegex = new RegExp(/^\d \d [NESW]$/);
const roverCommandsValidationRegex = new RegExp(/^[LRM]*$/);

export const isValidFileFormat = (fileContents) => {
    const [gridSettings, ...roverSettingsAndCommands] = fileContents
        .split(/\n/)
        .map((line) => line.trim());
    return (
        gridSettingsValidationRegex.test(gridSettings) &&
        roverSettingsAndCommands.every((line, index) => {
            if (index % 2 === 0) {
                return roverSetupValidationRegex.test(line);
            }
            return roverCommandsValidationRegex.test(line);
        })
    );
};

export const isValidDirection = (directionToCheck) =>
    DIRECTIONS.includes(directionToCheck);

export const isValidCommand = (commandToCheck) =>
    VALID_COMMANDS.includes(commandToCheck);
