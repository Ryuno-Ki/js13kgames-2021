/**
 * Client side state.
 */
export const state = {
  downTime: 0,
  /** @type {SVGPolylineElement | null} */
  host: null,
  isPressed: false,
  /** @type {Array<number>} */
  points: [],
  /** @type {* | null} */
  socket: null,
  startTime: 0,
  upTime: 0
}
