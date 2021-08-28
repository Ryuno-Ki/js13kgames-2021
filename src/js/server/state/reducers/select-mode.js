import { MAXIMUM_GAME_SIZE } from '../../../constants.js'
import { pick } from '../../../pick.js'

/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:game} game */
/** @typedef {module:index.js:mode} mode */

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

  switch (payload.mode) {
    case 'new':
      games = newGame(state, payload)
      break
    case 'join':
      games = joinGame(state, payload)
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

  return Object.assign({}, state, { games, modes })
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
 * @returns {State}
 */
function joinGame (state, payload) {
  const gamesWithHostAndSpace = state
    .games
    .filter((/** @type {game} */g) => Boolean(g.host))
    .filter((/** @type {game} */g) => g.opponents.length < MAXIMUM_GAME_SIZE)

  const gameToJoin = pick(gamesWithHostAndSpace)

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
