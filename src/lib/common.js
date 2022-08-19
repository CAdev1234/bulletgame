class _Helper {
    constructor() {}
    checkNull = val => val === null || val === undefined
    truncateString = (
        longString,
        startChunk,
        endChunk
    ) => {

        if (!longString) return;
        return (
            longString.substring(0, startChunk) +
            '...' +
            longString.substring(longString.length - endChunk)
        );
    };
}

const Helper = new _Helper();

export default Helper