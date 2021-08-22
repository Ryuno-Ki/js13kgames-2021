/**
 * Client side state.
 */
export const state = {
  /** @type {Array<SVGCircleElement>} */
  avatars: [],
  downTime: 0,
  /** @type {SVGGElement | null} */
  edges: null,
  /** @type {SVGPolylineElement | null} */
  host: null,
  /** @type {Array<number>} */
  hostPoints: [],
  isPressed: false,
  /** @type {HTMLElement | null} */
  opponentsState: null,
  // @ts-ignore
  role: ROLE_UNKNOWN,
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
