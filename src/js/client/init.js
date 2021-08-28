import { bind } from './bind.js'
import { SOCKET_ADD_USER } from '../constants.js'
import { dom } from './dom.js'
import { navigate } from './navigate.js'
import { state } from './state.js'
import { updateHost } from './update-host.js'

/**
 * Setup the client code.
 */
export function init () {
  state.hostPoints = []
  // @ts-ignore
  dom.socket = window.io({ upgrade: false, transports: ['websocket'] })
  assignDomElements(dom)
  bind()
  state.startTime = (new Date()).valueOf()
  getUserData()
  updateHost()
}

/**
 * Searches the DOM for references to elements used in the game.
 *
 * @param {dom} dom
 */
function assignDomElements (dom) {
  dom.host = getHostState()
  dom.edges = getEdgesState()
  dom.socketState = getSocketState()
  dom.roleState = getRoleState()
  dom.opponentsState = getOpponentsState()
  dom.spectatorsState = getSpectatorsState()
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

  el.innerHTML = ''
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

function getUserData () {
  const form = document.getElementById('user-form')

  if (!form) {
    throw new Error('Cannot start game!')
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (!e.target) {
      throw new Error('Something went wrong!')
    }

    const formData = new FormData(/** @type {HTMLFormElement} */(e.target))
    const name = formData.get('name')
    const mode = formData.get('mode')

    if (name && mode) {
      state.name = String(name)
      state.mode = String(mode)
      console.log('State', state)
      dom.socket.emit(SOCKET_ADD_USER, { name: state.name })
      navigate('game')
    } else {
      console.error('Show validation error')
    }
  })
}