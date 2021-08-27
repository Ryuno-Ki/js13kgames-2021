/**
 * Combined reducer to delegate depending on action.type.
 *
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
export function reducer(state: State, action: Action): State;
export type user = {
    id: string;
    name: string;
};
export type Action = {
    type: string;
    payload: any;
};
export type State = {
    users: Array<user>;
};
