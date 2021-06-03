const espree = require('espree');
const {
    functionValidations,
    getFunctionName,
    isArrowFunction,
    isFunction,
    isRegularFunction,
    validateClassMethods,
} = require('./functions');

const espreeConfig = {
    ecmaVersion: 6
};

const maxFunctionArguments = 3;

const validateFile = (args, file) => {
    const parsedFile = espree.parse(file, espreeConfig).body;

    parsedFile.forEach((declaration) => {
        if(args.validateFunction) {
            isFunction(declaration) && functionValidations(file, declaration);

            validateClassMethods(file, declaration);

            if(isRegularFunction(declaration) && hasMoreArguments(declaration, maxFunctionArguments)) {
                const functionName = getFunctionName(declaration);

                throw new Error(`The function ${functionName} has more arguments than ${maxFunctionArguments}`);
            }

            isRegularFunction(declaration) && console.log(declaration);

            isArrowFunction(declaration) && declaration.declarations.forEach(declaration => {
            // console.log(declaration.init.params)
            });
        }
    });
};

const hasMoreArguments = (declaration, maxArguments) =>
    declaration.params?.length > maxArguments;

module.exports = {
    validateFile,
}
