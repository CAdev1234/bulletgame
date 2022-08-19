class _Helper {
    constructor() {}
    checkNull = val => val === null || val === undefined
    ellipseAddress(address = "", width = 4) {
        return `${address.slice(0, width)}...${address.slice(-width)}`;
    }
}

const Helper = new _Helper();

export default Helper