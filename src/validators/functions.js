const maxFunctionLength = 30;

const isArrowFunction = (ast) => {
    if(ast.type !== 'VariableDeclaration')
        return false;

    const { declarations } = ast;
    const {
        init: {
            type
        }
    } = declarations[0];

    return type === 'ArrowFunctionExpression';
};

const isRegularFunction = ({ type }) => type === 'FunctionDeclaration';

const isFunction = (ast) =>
    isArrowFunction(ast)
    || isRegularFunction(ast);

const getFunctionName = (ast) => {
    let declaration = ast;

    if(isArrowFunction(ast))
        declaration = ast.declarations[0];

    return declaration.id.name;
}

const generateFunctionError = (name) => {
    throw new Error(`The function ${name} is longer than ${maxFunctionLength}`);
}

const functionValidations = (file, declaration) => {
    const { start, end } = declaration;

    const functionContent = file.slice(start, end);
    const functionLength = functionContent.split('\n').length;

    if(functionLength > maxFunctionLength) {
        const functionName = getFunctionName(declaration);

        generateFunctionError(functionName)
    }

    return;
}

module.exports = {
    functionValidations,
    isFunction,
}
