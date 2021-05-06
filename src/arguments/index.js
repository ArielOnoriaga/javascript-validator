const validArguments = require('./validArguments');

const arguments = process.argv;
const flags = arguments.slice(2);

const validFlags = Object.values(validArguments);
const flagsKeys = Object.keys(validArguments);

const existsOnArray = (array, value) => array.indexOf(value) > -1;

const getFlag = (flag) => {
    let key = '';

    validFlags.forEach((alias, index) => {
        if(existsOnArray(alias, flag))
            key = flagsKeys[index];
    });

    return key;
}

const getArgs = () => {
    const validUsedArguments = {};
    const invalidUsedArguments = [];
    const flattenValidFlags = validFlags.flat();

    flags
        .forEach(flag => {
            const [argType, value] = flag.split('=');

            existsOnArray(flattenValidFlags, argType)
                ? validUsedArguments[getFlag(argType)] = value
                : invalidUsedArguments.push(argType);
        });

    if(invalidUsedArguments.length)
        console.warn('The next arguments are invalid', invalidUsedArguments);

    return validUsedArguments;
}

module.exports = getArgs;
