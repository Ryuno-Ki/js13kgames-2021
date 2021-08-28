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
export type SelectModeDetails = {
    mode: string;
};
