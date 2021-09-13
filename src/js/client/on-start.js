import {
  DIRECTION_BOTTOM,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_TOP,
  SOCKET_KEY_UP
} from '../constants.js'
import { dom } from './dom.js'
import { onKeyDown } from './on-key-down.js'
import { onKeyUp } from './on-key-up.js'
import { setMessage } from './set-message.js'

/**
 * Game is ready to play.
 *
 * @param {object} details
 * @param {string} details.role
 */
export function onStart ({ role }) {
  document.body.dataset.role = role

  // @ts-ignore
  if (role === ROLE_HOST) {
    registerHostKeys()
  }

  // @ts-ignore
  if (role === ROLE_OPPONENT) {
    registerOpponentKeys()
  }

  registerFormEventListeners()
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
        playSound('shoot')
      }
    },
    false
  )
}

/**
 * Registers key events for opponent player.
 */
function registerOpponentKeys () {
  document.body.addEventListener(
    'keyup',
    (/** @type {KeyboardEvent} */e) => {
      switch (e.code) {
        case 'ArrowUp':
          e.preventDefault()
          moveUp()
          playSound('hit')
          break
        case 'ArrowRight':
          e.preventDefault()
          moveRight()
          playSound('hit')
          break
        case 'ArrowDown':
          e.preventDefault()
          moveDown()
          playSound('hit')
          break
        case 'ArrowLeft':
          e.preventDefault()
          moveLeft()
          playSound('hit')
          break
      }
    },
    false
  )
}

/**
 * Handle submit events on forms to allow play without keyboard.
 */
function registerFormEventListeners () {
  /** @type {Array<HTMLFormElement>} */
  const forms = Array.from(document.querySelectorAll('#scene-game form'))
  forms.forEach((/** @type {HTMLFormElement} */form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const formData = new FormData(form)
      const key = formData.get('key')

      switch (key) {
        case 'SPACE':
          onKeyDown()
          setTimeout(onKeyUp, 1300 * Math.random())
          playSound('shoot')
          break
        case 'TOP':
          moveUp()
          playSound('hit')
          break
        case 'LEFT':
          moveLeft()
          playSound('hit')
          break
        case 'BOTTOM':
          moveDown()
          playSound('hit')
          break
        case 'RIGHT':
          moveRight()
          playSound('hit')
          break
        default:
          // noop
      }
    })
  })
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

/**
 * Plays a sound effect.
 *
 * @param {string} kind
 */
function playSound (kind) {
  if (kind === 'shoot') {
    // @ts-ignore
    window.zzfx(
      /* eslint-disable-next-line */
      ...[,,4,.02,.09,.06,4,.09,-4.6,-0.1,,,.08,.3,,,,.82,.04]
    ) // Shoot 37
  }

  if (kind === 'hit') {
    // @ts-ignore
    window.zzfx(
      /* eslint-disable-next-line */
      ...[,,350,,,.09,4,1.13,,6.9,,,,.9,,.5,,.93,.01,.18]
    ) // Hit 37
  }
}
