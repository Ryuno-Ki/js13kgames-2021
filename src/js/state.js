/**
 * Client side state.
 */
export const state = {
  downTime: 0,
  /** @type {SVGPolylineElement | null} */
  host: null,
  isPressed: false,
  /** @type {HTMLElement | null} */
  opponentsState: null,
  /** @type {Array<number>} */
  points: [],
  /** @type {HTMLElement | null} */
  roleState: null,
  /** @type {* | null} */
  socket: null,
  /** @type {HTMLElement | null} */
  socketState: null,
  /** @type {HTMLElement | null} */
  spectatorsState: null,
  startTime: 0,
  upTime: 0
}
