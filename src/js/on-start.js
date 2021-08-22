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
    createAvatar()
    registerOpponentKeys()
  }

  setMessage('Playing')
}

function createAvatar () {
  if (!state.edges) {
    throw new Error('Boom')
  }

  const ns = 'http://www.w3.org/2000/svg'
  const circle = document.createElementNS(ns, 'circle')
  circle.setAttribute('r', '1')

  const side = pick([0, 1, 2, 3])
  switch (side) {
    case 0:
      circle.setAttribute('cx', '160')
      circle.setAttribute('cy', '0')
      break
    case 1:
      circle.setAttribute('cx', '100')
      circle.setAttribute('cy', '0')
      break
    case 2:
      circle.setAttribute('cx', '100')
      circle.setAttribute('cy', '320')
      break
    case 3:
      circle.setAttribute('cx', '160')
      circle.setAttribute('cy', '200')
      break
  }

  state.edges.appendChild(circle)
}

/**
 * Selects a random element from a list.
 *
 * @param {Array<number>} list
 * @return {number}
 */
function pick (list) {
  const length = list.length
  return list[Math.floor(Math.random() * length)]
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
  if (!state.edges) {
    throw new Error('Boom')
  }

  // TODO: Scale to more opponents
  /** @type {SVGCircleElement} */
  const avatar = /** @type {*} */(state.edges.children[0])

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
          moveAvatarUp(avatar)
          break
        case 'ArrowRight':
          e.preventDefault()
          moveAvatarRight(avatar)
          break
        case 'ArrowDown':
          e.preventDefault()
          moveAvatarDown(avatar)
          break
        case 'ArrowLeft':
          e.preventDefault()
          moveAvatarLeft(avatar)
          break
      }
    },
    false
  )
}

/**
 * Moves the avatar up an unit.
 *
 * @param {SVGCircleElement} avatar
 */
function moveAvatarUp (avatar) {
  /** @type {string | number | null} */
  let cy = avatar.getAttribute('cy')

  if (cy === null) {
    throw new Error('Boom')
  }

  cy = parseInt(cy, 10)
  if (cy > 0) {
    avatar.setAttribute('cy', Math.max(cy - 0.01 * 200, 0) + '')
  }
}

/**
 * Moves the avatar right an unit.
 *
 * @param {SVGCircleElement} avatar
 */
function moveAvatarRight (avatar) {
  /** @type {string | number | null} */
  let cx = avatar.getAttribute('cx')

  if (cx === null) {
    throw new Error('Boom')
  }

  cx = parseInt(cx, 10)
  if (cx <= 320) {
    avatar.setAttribute('cx', Math.min(cx + 0.01 * 320, 320) + '')
  }
}

/**
 * Moves the avatar down an unit.
 *
 * @param {SVGCircleElement} avatar
 */
function moveAvatarDown (avatar) {
  /** @type {string | number | null} */
  let cy = avatar.getAttribute('cy')

  if (cy === null) {
    throw new Error('Boom')
  }

  cy = parseInt(cy, 10)
  if (cy <= 200) {
    avatar.setAttribute('cy', Math.min(cy + 0.01 * 200, 200) + '')
  }
}

/**
 * Moves the avatar left an unit.
 *
 * @param {SVGCircleElement} avatar
 */
function moveAvatarLeft (avatar) {
  /** @type {string | number | null} */
  let cx = avatar.getAttribute('cx')

  if (cx === null) {
    throw new Error('Boom')
  }

  cx = parseInt(cx, 10)
  if (cx > 0) {
    avatar.setAttribute('cx', Math.max(cx - 0.01 * 320, 0) + '')
  }
}
