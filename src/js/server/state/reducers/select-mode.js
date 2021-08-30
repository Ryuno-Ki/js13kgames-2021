import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  MAXIMUM_GAME_SIZE
} from '../../../constants.js'
import { pick } from '../../../pick.js'

/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:game} game */
/** @typedef {module:index.js:mode} mode */
/** @typedef {module:index.js:point} point */

/**
 * @typedef {object} payload
 * @property {string} payload.id
 * @property {string} payload.mode
 */

/**
 * Select mode for an user.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
export function selectMode (state, payload) {
  let games = state.games
  let points = state.points
  let gameToJoin

  switch (payload.mode) {
    case 'new':
      games = newGame(state, payload)
      points = initialPointsForHost(state, payload)
      break
    case 'join':
      gameToJoin = findGameToJoin(state)
      games = joinGame(state, payload, gameToJoin)
      points = initialPointsForOpponent(state, payload, games, gameToJoin)
      break
    case 'watch':
      games = watchGame(state, payload)
      break
    default:
      // Noop
  }

  const modes = state.modes.map((/** @type {mode} */mode) => {
    if (mode.id === payload.id) {
      return { ...payload }
    }

    return mode
  })

  return Object.assign({}, state, { games, modes, points })
}

/**
 * Creates a new game.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
function newGame (state, payload) {
  return /** @type {Array<game>} */[]
    .concat(state.games)
    .concat(/** @type {game} */({
      host: payload.id,
      opponents: /** @type {Array<string>} */([]),
      spectators: /** @type {Array<string>} */([])
    }))
}

/**
 * Join a game.
 *
 * @param {State} state
 * @param {payload} payload
 * @param {game} gameToJoin
 * @returns {State}
 */
function joinGame (state, payload, gameToJoin) {
  return state.games.map((/** @type {game} */g) => {
    if (g.host === gameToJoin.host) {
      return {
        ...g,
        opponents: /** @type {Array<string>} */([])
          .concat(g.opponents)
          .concat(payload.id)
      }
    }

    return g
  })
}

/**
 * Pick a random active game to watch.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
function watchGame (state, payload) {
  const gamesWithHostAndOpponents = state
    .games
    .filter((/** @type {game} */game) => Boolean(game.host))
    .filter((/** @type {game} */game) => game.opponents.length > 0)

  const gameToJoin = pick(gamesWithHostAndOpponents)

  return state.games.map((/** @type {game} */g) => {
    if (g.host === gameToJoin.host) {
      return {
        ...g,
        spectators: /** @type {Array<string>} */([])
          .concat(g.spectators)
          .concat(payload.id)
      }
    }

    return g
  })
}

/**
 * Populate the points with the center for the host.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
function initialPointsForHost (state, payload) {
  return /** @type {Array<point>} */([])
    .concat(state.points)
    .concat({ id: payload.id, x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 })
}

/**
 * Populate the points with the center for the host.
 *
 * @param {State} state
 * @param {payload} payload
 * @param {Array<game>} games
 * @param {game} gameToJoin
 * @returns {State}
 */
function initialPointsForOpponent (state, payload, games, gameToJoin) {
  let index = 0

  if (payload.id.startsWith('AI-')) {
    const id = /\d+/.exec(payload.id)
    if (id) {
      index = parseInt(id[0], 10) % 4
    }
  }

  const points = [
    { x: 0, y: CANVAS_HEIGHT / 2 },
    { x: CANVAS_WIDTH, y: CANVAS_HEIGHT / 2 },
    { x: CANVAS_WIDTH / 2, y: 0 },
    { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT }
  ]
  const point = points[index]

  return /** @type {Array<point>} */([])
    .concat(state.points)
    .concat({ id: payload.id, ...point })
}

/**
 * Picks a random game from those available to join.
 *
 * @param {State} state
 * @returns {game}
 */
function findGameToJoin (state) {
  const gamesWithHostAndSpace = state
    .games
    .filter((/** @type {game} */g) => Boolean(g.host))
    .filter((/** @type {game} */g) => {
      return g.opponents
        .filter((/** @type {string} */opponent) => !opponent.startsWith('AI-'))
        .length < MAXIMUM_GAME_SIZE
    })

  return pick(gamesWithHostAndSpace)
}
