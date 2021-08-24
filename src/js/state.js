/**
 * Client side state.
 */
export const state = {
  downTime: 0,
  /** @type {Array<number>} */
  hostPoints: [],
  isPressed: false,
  /** @type {Array<Array<number>>} */
  opponentPoints: [],
  // @ts-ignore
  role: ROLE_UNKNOWN,
  startTime: 0,
  upTime: 0
}
