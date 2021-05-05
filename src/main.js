const fs = require('fs');
const path = require('path');

const { getArgs } = require('./arguments');

const [validArguments] = getArgs();

const file = path.join(
    __dirname,
    validArguments.file ?? '../../vue-hicons/src/VueHicons.vue'
);

try {
    const readedFile = fs.readFileSync(file, 'utf-8');

    const lines = readedFile.split('\n');
    const fileLength = lines.length;

    if(fileLength > 300) {
        throw `The file ${file} has length greater than 10`;
    }

} catch (err) {
    throw err;
}
