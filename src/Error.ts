//Enum of error messages
export enum Errors {
    invalidSKUSequence = "item is not a valid SKU Sequence",
    itemNotPresentInStore = "item is not present in the store"
}

export class InvalidSKUSequenceError extends Error {
    constructor(...args: string[]) {
        super(...args);
        Error.captureStackTrace(this, InvalidSKUSequenceError)
    }
}

export class ItemNotPresentInStore extends Error {
    constructor(...args: string[]) {
        super(...args);
        Error.captureStackTrace(this, ItemNotPresentInStore)
    }
}

export class ItemAlreadyPresentInStore extends Error {
    constructor(...args: string[]) {
        super(...args);
        Error.captureStackTrace(this, ItemNotPresentInStore)
    }
}