/**
 * Combined reducer to delegate depending on action.type.
 *
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
export function reducer(state: State, action: Action): State;
export type game = {
    host: string;
    opponents: Array<string>;
    spectators: Array<string>;
};
export type mode = {
    id: string;
    mode: string;
};
export type user = {
    id: string;
    name: string;
};
export type Action = {
    type: string;
    payload: any;
};
export type State = {
    connections: Array<string>;
    games: Array<game>;
    modes: Array<mode>;
    users: Array<user>;
};
