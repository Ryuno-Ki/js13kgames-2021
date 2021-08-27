/** @typedef {*} Game */
/** @typedef {*} Socket */
/**
 * User session class
 */
export class User {
    /**
     * @param {Socket} socket
     */
    constructor(socket: Socket);
    socket: any;
    game: any;
    /** @type {Array<User>} */
    opponents: Array<User>;
    role: any;
    /**
     * Assigns the role in the current party.
     *
     * @param {string} role
     */
    setRole(role: string): void;
    /**
     * Start new game
     *
     * @param {Game} game
     * @param {Array<User>} opponents
     */
    start(game: Game, opponents: Array<User>): void;
    /**
     * Terminate game
     */
    end(): void;
    /**
     * Trigger win event
     */
    win(): void;
    /**
     * Trigger lose event
     */
    loose(): void;
    /**
     * Trigger draw event
     */
    draw(): void;
}
export type Game = any;
export type Socket = any;
