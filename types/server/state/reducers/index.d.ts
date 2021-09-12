/**
 * Combined reducer to delegate depending on action.type.
 *
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
export function reducer(state: State, action: Action): State;
export type color = {
    id: string;
    value: string;
};
export type game = {
    host: string;
    opponents: Array<string>;
};
export type mode = {
    id: string;
    mode: string;
};
export type point = {
    id: string;
    x: number;
    y: number;
};
export type scene = {
    id: string;
    scene: string;
};
export type timer = {
    id: string;
    turns: string;
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
    colors: Array<color>;
    connections: Array<string>;
    games: Array<game>;
    modes: Array<mode>;
    points: Array<point>;
    timers: Array<timer>;
    users: Array<user>;
};
