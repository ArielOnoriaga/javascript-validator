const fs = require('fs');
const path = require('path');
const getArgs = require('./arguments');
const { validateFile } = require('./validators');

const maxFileLength = 100;

try {
    const usedArguemnts = getArgs();

    const file = path.join(
        __dirname,
        usedArguemnts.file ?? '../_test.js'
    );

    const readedFile = fs.readFileSync(file, 'utf-8');

    validateFile(usedArguemnts, readedFile);

    const lines = readedFile.split('\n');
    const fileLength = lines.length;

    if(fileLength > maxFileLength)
        throw new Error(`The file ${file} has length greater than ${maxFileLength} lines`);

    console.log('Successfully!!!');

} catch (err) {
    console.log(err);
}
