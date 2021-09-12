import { bind } from './bind.js'
import { ERROR, SOCKET_ADD_USER, SOCKET_SELECT_MODE } from '../constants.js'
import { dom } from './dom.js'
import { navigate } from './navigate.js'

/**
 * Setup the client code.
 */
export function init () {
  // @ts-ignore
  dom.socket = window.io({ upgrade: false, transports: ['websocket'] })
  assignDomElements(dom)
  bind()
  getUserData()
  makeMatch()
  patchLinks()
  navigate('title')
}

/**
 * Searches the DOM for references to elements used in the game.
 *
 * @param {dom} dom
 */
function assignDomElements (dom) {
  dom.host = getHostState()
  dom.opponents = getEdgesState()
  dom.socketState = getSocketState()
  dom.roleState = getRoleState()
  dom.opponentsState = getOpponentsState()
}

/**
 * Searches the DOM for host element.
 *
 * @return {SVGPolylineElement}
 */
function getHostState () {
  const el = document.getElementById('host')

  if (!el) {
    throw new Error(ERROR)
  }

  return /** @type {*} */(el)
}

/**
 * Searches the DOM for the opponents group element.
 *
 * @return {SVGGElement}
 */
function getEdgesState () {
  const el = document.getElementById('opponents')

  if (!el) {
    throw new Error(ERROR)
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
    throw new Error(ERROR)
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
    throw new Error(ERROR)
  }

  return el
}

/**
 * Searches the DOM for opponents placeholder element.
 *
 * @return {HTMLElement}
 */
function getOpponentsState () {
  const el = document.getElementById('opponent-list')

  if (!el) {
    throw new Error(ERROR)
  }

  return el
}

function getUserData () {
  const form = document.getElementById('user-form')

  if (!form) {
    throw new Error(ERROR)
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (!e.target) {
      throw new Error(ERROR)
    }

    const formData = new FormData(/** @type {HTMLFormElement} */(e.target))
    const name = formData.get('name')

    if (name) {
      dom.socket.emit(SOCKET_ADD_USER, { name })
      navigate('match-form')
    } else {
      console.error('Show validation error')
    }
  })
}

function makeMatch () {
  const form = document.getElementById('match-form')

  if (!form) {
    throw new Error(ERROR)
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (!e.target) {
      throw new Error(ERROR)
    }

    const formData = new FormData(/** @type {HTMLFormElement} */(e.target))
    const mode = formData.get('mode')

    if (mode) {
      dom.socket.emit(SOCKET_SELECT_MODE, { mode })
      navigate('game')
    } else {
      console.error('Show validation error')
    }
  })
}

/**
 * Patch all links, since the approach with navigate won't work on Opera or
 * Chromium web browser.
 */
function patchLinks () {
  Array.from(document.querySelectorAll('a')).forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href')

      if (href) {
        e.preventDefault()
        const target = href.slice('#scene-'.length)
        navigate(target)
      }
    }, false)
  })
}
