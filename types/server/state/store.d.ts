export default store;
export type AddNameAction = import('./actions/add-name').Action;
export type UpdateNameAction = import('./actions/update-name').Action;
export type RemoveUserAction = import('./actions/remove-user').Action;
export type Action = AddNameAction | UpdateNameAction | RemoveUserAction;
declare const store: Store;
/** @typedef {import('./actions/add-name').Action} AddNameAction */
/** @typedef {import('./actions/update-name').Action} UpdateNameAction */
/** @typedef {import('./actions/remove-user').Action} RemoveUserAction */
/** @typedef {AddNameAction | UpdateNameAction | RemoveUserAction} Action */
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
