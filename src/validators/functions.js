const {
    arrowFunction,
    regularFunction,
    variables,
    objectExpression,
} = require('../ast/types');

const maxFunctionLength = 30;

const isVariableDeclaration = ast => ast.type === variables;
const isObject = (ast) => ast.type === objectExpression;

const getClassesWithMethods = (ast) =>
    ast.declarations
        .filter(declaration => isObject(declaration.init))
        .filter(({ init: { properties } }) =>
            properties.filter(property => isRegularFunction(property.value))
        );

const isArrowFunction = (ast) => {
    if(!isVariableDeclaration(ast)) return;

    const { declarations } = ast;
    const {
        init: {
            type
        }
    } = declarations[0];

    return type === arrowFunction;
};

const isRegularFunction = ({ type }) => regularFunction.includes(type);

const isFunction = ast =>
    isArrowFunction(ast)
    || isRegularFunction(ast);

const getFunctionName = (ast) => {
    let declaration = ast;

    if(isArrowFunction(ast)) {
        [declaration] = ast.declarations;
    }

    return declaration.id?.name || declaration.key?.name;
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

    return true;
}

const validateClassMethods = (file, declaration) => {
    isVariableDeclaration(declaration) && getClassesWithMethods(declaration)
        .forEach(classAst => {
            classAst
                .init
                .properties
                .filter(method => isRegularFunction(method.value))
                .forEach(method => functionValidations(file, method))
        });
};

module.exports = {
    functionValidations,
    getClassesWithMethods,
    isArrowFunction,
    isFunction,
    isRegularFunction,
    isVariableDeclaration,
    validateClassMethods,
    getFunctionName,
}
