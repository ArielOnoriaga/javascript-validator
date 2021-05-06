const fs = require('fs');
const path = require('path');
const getArgs = require('./arguments');
const { validateFile } = require('./validators');

try {
    const usedArguemnts = getArgs();

    const file = path.join(
        __dirname,
        usedArguemnts.file ?? '../../vue-hicons/src/VueHicons.vue'
    );

    const readedFile = fs.readFileSync(file, 'utf-8');
    validateFile(readedFile);

    const lines = readedFile.split('\n');
    const fileLength = lines.length;

    if(fileLength > 10) {
        throw `The file ${file} has length greater than 10`;
    }

} catch (err) {
    throw err;
}
