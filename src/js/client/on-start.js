import {
  DIRECTION_BOTTOM,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_TOP,
  ERROR,
  SOCKET_KEY_UP
} from '../constants.js'
import { dom } from './dom.js'
import { onKeyDown } from './on-key-down.js'
import { onKeyUp } from './on-key-up.js'
import { setMessage } from './set-message.js'
import { setParty } from './set-party.js'
import { state } from './state.js'

/**
 * Game is ready to play.
 *
 * @param {object} details
 * @param {string} details.role
 * @param {Array<string>} details.opponents
 * @param {Array<string>} details.spectators
 */
export function onStart ({ role, opponents, spectators }) {
  // @ts-ignore
  state.role = role

  // @ts-ignore
  if (role === ROLE_HOST) {
    setParty({ role, opponents, spectators })
    registerHostKeys()
  }

  // @ts-ignore
  if (role === ROLE_OPPONENT) {
    // TODO: Define setParty for opponent
    registerOpponentKeys()
  }

  setMessage('Playing')
}

/**
 * Registers key events for host player.
 */
function registerHostKeys () {
  document.body.addEventListener(
    'keydown',
    (/** @type {KeyboardEvent} */e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        onKeyDown()
      }
    },
    false
  )

  document.body.addEventListener(
    'keyup',
    (/** @type {KeyboardEvent} */e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        onKeyUp()
      }
    },
    false
  )
}

/**
 * Registers key events for opponent player.
 */
function registerOpponentKeys () {
  if (!dom.edges) {
    throw new Error(ERROR)
  }

  document.body.addEventListener(
    'keyup',
    (/** @type {KeyboardEvent} */e) => {
      switch (e.code) {
        case 'ArrowUp':
          e.preventDefault()
          moveUp()
          playSound()
          break
        case 'ArrowRight':
          e.preventDefault()
          moveRight()
          playSound()
          break
        case 'ArrowDown':
          e.preventDefault()
          moveDown()
          playSound()
          break
        case 'ArrowLeft':
          e.preventDefault()
          moveLeft()
          playSound()
          break
      }
    },
    false
  )
}

/**
 * Inform server about move to the right.
 */
function moveUp () {
  dom.socket.emit(SOCKET_KEY_UP, { direction: DIRECTION_TOP })
}

/**
 * Inform server about move to the right.
 */
function moveRight () {
  dom.socket.emit(SOCKET_KEY_UP, { direction: DIRECTION_RIGHT })
}

/**
 * Inform server about move to the bottom.
 */
function moveDown () {
  dom.socket.emit(SOCKET_KEY_UP, { direction: DIRECTION_BOTTOM })
}

/**
 * Inform server about move to the left.
 */
function moveLeft () {
  dom.socket.emit(SOCKET_KEY_UP, { direction: DIRECTION_LEFT })
}

function playSound () {
  // @ts-ignore
  window.zzfx(
    /* eslint-disable-next-line */
    ...[,,350,,,.09,4,1.13,,6.9,,,,.9,,.5,,.93,.01,.18]
  ) // Hit 37
}
