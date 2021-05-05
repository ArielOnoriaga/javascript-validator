const arguments = process.argv;
const flags = arguments.slice(2);

const validArguments = ['--path', '-p', '--file'];


const getArgs = () => {
    const validUsedArguments = {};
    const invalidUsedArguments = [];

    flags.forEach(flag => {
        const [argType, value] = flag.split('=');

        validArguments.indexOf(argType) > -1
            ? validUsedArguments[argType.split('--')[1]] = value
            : invalidUsedArguments.push(flag);
    });

    return [validUsedArguments, invalidUsedArguments];
}

module.exports = {
    getArgs,
}
