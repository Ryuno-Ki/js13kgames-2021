/** @typedef {*} User */
/**
 * Game class
 */
export class Game {
    /**
     * @param {User} user
     * @param {Array<User>} opponents
     */
    constructor(user: User, opponents: Array<User>);
    user: any;
    opponents: any[];
    /**
     * Start new game
     */
    start(): void;
    /**
     * Has game ended?
     *
     * @return {boolean}
     */
    ended(): boolean;
    /**
     * Final score
     */
    score(): void;
}
export type User = any;
