import { readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function readDataFiles() {
    const dataFiles = readdirSync(resolve(__dirname, '../data'));
    return dataFiles.map((filename) => {
        return {
            filename,
            contents: readFile(resolve(__dirname, '../data'), filename),
        };
    });
}
export function readFile(rootDirectory, filename) {
    return readFileSync(resolve(rootDirectory, filename), {
        encoding: 'utf-8',
    });
}
