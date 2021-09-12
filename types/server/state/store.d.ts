export default store;
export type AddNameAction = any;
export type UpdateNameAction = any;
export type RemoveUserAction = any;
export type Action = AddNameAction | UpdateNameAction | RemoveUserAction;
declare const store: Store;
/**
 * Store to manage state
 */
declare class Store {
    /** @param {function} reducer */
    constructor(reducer: Function);
    reducer: Function;
    state: any;
    /** @param {Action} action */
    dispatch(action: Action): Promise<void>;
    /**
     * Searches all games for one with bots as opponents.
     */
    findGameAvailableForJoin(): any;
    /**
     * Queries the store for the game hosted by given socketId.
     *
     * @param {string} socketId
     * @returns {* | null}
     */
    getGameForHost(socketId: string): any | null;
    /**
     * Filters the points for the host of a game socketId participates in.
     *
     * @param {string} socketId
     * @returns {Array<Array<number>>}
     */
    getPointsForHost(socketId: string): Array<Array<number>>;
    /**
     * Queries the state for all opponents in the game led by the host.
     *
     * @param {string} socketId
     * @returns {*}
     */
    getOpponentIdsOfHost(socketId: string): any;
    /**
     * Filters the points for the opponent of a game socketId participates in.
     *
     * @param {string} socketId
     * @returns {Array<Array<number>>}
     */
    getPointsForOpponents(socketId: string): Array<Array<number>>;
    /**
     * Filters the points for the opponent of a game socketId participates in.
     *
     * @param {string} socketId
     * @returns {Array<Array<number>>}
     */
    getPointsForOpponent(socketId: string): Array<Array<number>>;
    /**
     * Get the current state.
     *
     * @returns {*}
     */
    getState(): any;
    /**
     * Get the number of turns for this game.
     *
     * @param {string} socketId
     * @returns {number}
     */
    getTurns(socketId: string): number;
    /**
     * Filter the games for the one socketId participates in.
     *
     * @private
     * @param {string} socketId
     * @returns {*}
     */
    private _findGameBySocketId;
    /**
     * Looks up the user name for given socketId.
     *
     * @private
     * @param {string} socketId
     * @returns {string | null}
     */
    private _resolveNameForId;
    /**
     * Adds a record in database for name.
     *
     * @private
     * @param {*} payload
     */
    private _saveName;
    /**
     * Updates record in database with role.
     *
     * @private
     * @param {*} payload
     */
    private _saveRole;
}
