import { bind } from './bind.js'
import { dom } from './dom.js'
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
  const nameEl = document.getElementById('name')

  if (!nameEl) {
    throw new Error('Cannot start game!')
  }

  const modeEl = document.getElementById('mode')

  if (!modeEl) {
    throw new Error('Cannot start game!')
  }

  const delay = 200
  const onDebouncedInput = debounce((/** @type {*} */e) => {
    if (e.target) {
      state.name = e.target.value
      console.log('Name changed', state.name)
    }
  }, delay)

  nameEl.addEventListener('input', (e) => {
    onDebouncedInput(e)
  })

  modeEl.addEventListener('change', (e) => {
    if (e.target) {
      state.mode = /** @type {*} */(e.target).value
      console.log('Mode changed', state.mode)
    }
  })
}

// Kudos https://www.freecodecamp.org/news/javascript-debounce-example/
/**
 * Delay execution of a function.
 *
 * @param {*} callback
 * @param {number} timeout
 * @return {*}
 */
function debounce (callback, timeout = 300) {
  /** @type {number | undefined} */
  let timer

  return (/** @type {*[]} */...args) => {
    if (timer) { clearTimeout(timer) }
    // @ts-ignore
    const self = this
    timer = /** @type {*} */(
      setTimeout(
        () => { callback.apply(self, args) },
        timeout
      )
    )
  }
}
