import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const writeToOutputFile = (filename, contents) => {
    const outputDirPath = path.resolve(__dirname, '../output');
    if (!existsSync(outputDirPath)) {
        mkdirSync(outputDirPath);
    }

    writeFileSync(path.resolve(outputDirPath, filename), contents);
};
