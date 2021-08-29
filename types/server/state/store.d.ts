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
    getState(): any;
    /** @param {Action} action */
    dispatch(action: Action): void;
}
