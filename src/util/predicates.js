function isUndefined(variable) {
    return typeof variable === 'undefined';
}

function isDefined(variable) {
    return !isUndefined(variable);
}

export { isUndefined, isDefined };