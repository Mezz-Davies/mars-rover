import { readDataFiles } from './src/readData.js';
import { processInputString } from './src/processInputString.js';
import { writeToOutputFile } from './src/writeResult.js';
import { isValidFileFormat } from './src/validation.js';

const dataFiles = readDataFiles();

dataFiles.forEach(({ filename, contents }) => {
    if (isValidFileFormat(contents)) {
        try {
            const finalPositions = processInputString(contents);
            console.log(`Results for ${filename}:`);
            const finalPositionsAsString = finalPositions.join('\r\n');
            console.log(finalPositionsAsString);
            const outputFilename = `output-${filename}`;
            console.log(`writing to ${outputFilename} in output directory`);
            writeToOutputFile(outputFilename, finalPositionsAsString);
        } catch (err) {
            console.error(`error processing file '${filename}'. ${err}`);
            console.log(`skipping remaining processing for ${filename}`);
        }
    } else {
        console.log(`file ${filename} does not have valid format. Skipping.`);
    }
});
