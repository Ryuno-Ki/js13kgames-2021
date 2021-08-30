/**
 * Socket.io wrapper
 *
 * @param {Socket} socket
 */
export function io(socket: Socket): void;
export type Socket = any;
export type AddUserDetails = {
    name: string;
};
export type NavigateDetails = {
    scene: string;
};
export type OnKeyUpDetails = {
    delta?: number | undefined;
    direction?: number | undefined;
};
export type SelectModeDetails = {
    mode: string;
};
