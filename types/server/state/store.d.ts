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
    dispatch(action: Action): void;
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
     * Get the current state.
     * @returns {*}
     */
    getState(): any;
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
}
