import { bind } from './bind.js'
import { state } from './state.js'
import { updateHost } from './update-host.js'

/**
 * Setup the client code.
 */
export function init () {
  state.points = []
  // @ts-ignore
  state.socket = window.io({ upgrade: false, transports: ['websocket'] })
  assignDomElements(state)
  bind()
  state.startTime = (new Date()).valueOf()
  updateHost()
}

/**
 * Searches the DOM for references to elements used in the game.
 *
 * @param {state} state
 */
function assignDomElements (state) {
  state.host = getHostState()
  state.edges = getEdgesState()
  state.socketState = getSocketState()
  state.roleState = getRoleState()
  state.opponentsState = getOpponentsState()
  state.spectatorsState = getSpectatorsState()
}

/**
 * Searches the DOM for host element.
 *
 * @return {SVGPolylineElement}
 */
function getHostState () {
  const el = document.getElementById('host')

  if (!el) {
    throw new Error('Cannot start game!')
  }

  return /** @type {*} */(el)
}

/**
 * Searches the DOM for the edges group element.
 *
 * @return {SVGGElement}
 */
function getEdgesState () {
  const el = document.getElementById('edges')

  if (!el) {
    throw new Error('Cannot start game!')
  }

  return /** @type {*} */(el)
}

/**
 * Searches the DOM for socket debug element.
 *
 * @return {HTMLElement}
 */
function getSocketState () {
  const el = document.getElementById('socketState')

  if (!el) {
    throw new Error('Cannot start game!')
  }

  return el
}

/**
 * Searches the DOM for role placeholder element.
 *
 * @return {HTMLElement}
 */
function getRoleState () {
  const el = document.getElementById('role')

  if (!el) {
    throw new Error('Cannot start game!')
  }

  return el
}

/**
 * Searches the DOM for opponents placeholder element.
 *
 * @return {HTMLElement}
 */
function getOpponentsState () {
  const el = document.getElementById('opponents')

  if (!el) {
    throw new Error('Cannot start game!')
  }

  return el
}

/**
 * Searches the DOM for spectators placeholder element.
 *
 * @return {HTMLElement}
 */
function getSpectatorsState () {
  const el = document.getElementById('spectators')

  if (!el) {
    throw new Error('Cannot start game!')
  }

  return el
}
