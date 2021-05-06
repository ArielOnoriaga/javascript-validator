const espree = require('espree');
const { isFunction, functionValidations } = require('./functions');

const espreeConfig = {
    ecmaVersion: 6
};

const maxFunctionLength = 30;

const validateFile = (file) => {
    const parsedFile = espree.parse(file, espreeConfig).body;

    parsedFile.forEach((declaration) => {
        if(isFunction(declaration))
            functionValidations(file, declaration);
    });
};

module.exports = {
    validateFile,
}
