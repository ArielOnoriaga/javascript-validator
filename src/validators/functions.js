const {
    arrowFunction,
    regularFunction,
    variables
} = require('../ast/types');

const maxFunctionLength = 30;

const isArrowFunction = (ast) => {
    if(ast.type !== variables)
        return false;

    const { declarations } = ast;
    const {
        init: {
            type
        }
    } = declarations[0];

    return type === arrowFunction;
};

const isRegularFunction = ({ type }) => type === regularFunction;

const isFunction = (ast) =>
    isArrowFunction(ast)
    || isRegularFunction(ast);

const getFunctionName = (ast) => {
    let declaration = ast;

    if(isArrowFunction(ast)) {
        declaration = ast.declarations[0];
    }

    return declaration.id.name;
}

const generateFunctionError = (name, lines) => {
    const functionName = `The function ${name}`;
    const isLonger = `is longer than ${maxFunctionLength} lines`;
    const has = `has ${lines} lines`

    throw new Error(`${functionName} ${isLonger}, ${has}`);
}

const functionValidations = (file, declaration) => {
    const { start, end } = declaration;

    const functionContent = file.slice(start, end);
    const functionLength = functionContent.split('\n').length;

    if(functionLength > maxFunctionLength) {
        const functionName = getFunctionName(declaration);

        generateFunctionError(functionName, functionLength);
    }

    return;
}

module.exports = {
    functionValidations,
    isFunction,
}
