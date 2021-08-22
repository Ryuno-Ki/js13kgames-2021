import { onKeyDown } from './on-key-down.js'
import { onKeyUp } from './on-key-up.js'
import { setMessage } from './set-message.js'
import { setParty } from './set-party.js'

/**
 * Game is ready to play.
 *
 * @param {object} details
 * @param {string} details.role
 * @param {number} details.opponents
 * @param {number} details.spectators
 */
export function onStart ({ role, opponents, spectators }) {
  setParty({ role, opponents, spectators })

  // @ts-ignore
  if (role === ROLE_HOST) {
    registerHostKeys()
  }

  // @ts-ignore
  if (role === ROLE_OPPONENT) {
    registerOpponentKeys()
  }

  setMessage('Playing')
}

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

function registerOpponentKeys () {
  document.body.addEventListener(
    'keydown',
    (/** @type {KeyboardEvent} */e) => {
      switch (e.code) {
        case 'ArrowUp':
          e.preventDefault()
          console.log('UP')
          break
        case 'ArrowRight':
          e.preventDefault()
          console.log('RIGHT')
          break
        case 'ArrowDown':
          e.preventDefault()
          console.log('DOWN')
          break
        case 'ArrowLeft':
          e.preventDefault()
          console.log('LEFT')
          break
      }
    },
    false
  )

  document.body.addEventListener(
    'keyup',
    (/** @type {KeyboardEvent} */e) => {
      switch (e.code) {
        case 'ArrowUp':
          e.preventDefault()
          console.log('UP')
          break
        case 'ArrowRight':
          e.preventDefault()
          console.log('RIGHT')
          break
        case 'ArrowDown':
          e.preventDefault()
          console.log('DOWN')
          break
        case 'ArrowLeft':
          e.preventDefault()
          console.log('LEFT')
          break
      }
    },
    false
  )
}
