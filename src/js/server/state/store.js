import {
  ADD_NAME,
  MAXIMUM_NUMBER_OF_VERTICES,
  NAMES
} from '../../constants.js'
import { getLogger } from '../../logger.js'
import { reducer } from './reducers/index.js'

/** @typedef {module:actions/add-name:Action} AddNameAction */
/** @typedef {module:actions/update-name:Action} UpdateNameAction */
/** @typedef {module:actions/remove-user:Action} RemoveUserAction */
/** @typedef {AddNameAction | UpdateNameAction | RemoveUserAction} Action */

const logger = getLogger('store')

/**
 * Store to manage state
 */
class Store {
  /** @param {function} reducer */
  constructor (reducer) {
    this.reducer = reducer
    this.state = reducer(undefined, { type: '' })
    // @ts-ignore
    storage.set(NAMES, [])
    logger.debug('Storage initialised.')
  }

  /** @param {Action} action */
  async dispatch (action) {
    this.state = this.reducer(this.state, action)
    logger.debug(`Dispatched ${JSON.stringify(action)}.\nNew state: ${JSON.stringify(this.state)}`)
    if (action.type === ADD_NAME) {
      const { name } = action.payload

      if (name.startsWith('Bot')) {
        return
      }

      // @ts-ignore
      const names = await storage.get(NAMES)
      // @ts-ignore
      await storage.set(NAMES, [].concat(names).concat(name))
    }
  }

  /**
   * Searches all games for one with bots as opponents.
   */
  findGameAvailableForJoin () {
    const game = this.state.games.find((/** @type {*} */g) => {
      const hasBot = g.opponents.find(
        (/** @type {string} */o) => o.startsWith('AI-')
      )

      return !!hasBot
    })

    if (!game) {
      return null
    }

    return game
  }

  /**
   * Queries the store for the game hosted by given socketId.
   *
   * @param {string} socketId
   * @returns {* | null}
   */
  getGameForHost (socketId) {
    const game = this._findGameBySocketId(socketId)

    if (!game) {
      return null
    }

    const color = this.state.colors.find((/** @type {*} */c) => {
      return c.id === game.host
    })

    return {
      host: {
        color: color ? color.value : 'transparent',
        name: this._resolveNameForId(game.host)
      },
      opponents: game.opponents
        .map((/** @type {string} */opponent) => {
          const opponentColor = this.state.colors.find((/** @type {*} */c) => {
            return c.id === opponent
          })

          return {
            color: opponentColor ? opponentColor.value : 'transparent',
            name: this._resolveNameForId(opponent)
          }
        })
    }
  }

  /**
   * Filters the points for the host of a game socketId participates in.
   *
   * @param {string} socketId
   * @returns {Array<Array<number>>}
   */
  getPointsForHost (socketId) {
    const game = this._findGameBySocketId(socketId)
    if (!game) {
      return []
    }

    return this.state.points
      .filter((/** @type {*} */point) => point.id === game.host)
      .map((/** @type {*} */point) => [point.x, point.y])
      .slice(-1 * MAXIMUM_NUMBER_OF_VERTICES)
  }

  /**
   * Queries the state for all opponents in the game led by the host.
   *
   * @param {string} socketId
   * @returns {*}
   */
  getOpponentIdsOfHost (socketId) {
    const game = this._findGameBySocketId(socketId)
    if (!game) {
      return []
    }

    return game.opponents
  }

  /**
   * Filters the points for the opponent of a game socketId participates in.
   *
   * @param {string} socketId
   * @returns {Array<Array<number>>}
   */
  getPointsForOpponents (socketId) {
    const game = this._findGameBySocketId(socketId)
    if (!game) {
      return []
    }

    const points = game.opponents
      .map((/** @type {string} */opponent) => {
        return this.state.points
          .filter((/** @type {*} */point) => {
            return point.id === opponent
          })
          .map((/** @type {*} */point) => [point.x, point.y])
      })

    return points
  }

  /**
   * Filters the points for the opponent of a game socketId participates in.
   *
   * @param {string} socketId
   * @returns {Array<Array<number>>}
   */
  getPointsForOpponent (socketId) {
    const game = this._findGameBySocketId(socketId)
    if (!game) {
      return []
    }

    const points = this.state.points
      .filter((/** @type {*} */point) => point.id === socketId)
      .map((/** @type {*} */point) => [point.x, point.y])

    return points
  }

  /**
   * Get the current state.
   * @returns {*}
   */
  getState () {
    return this.state
  }

  /**
   * Filter the games for the one socketId participates in.
   *
   * @private
   * @param {string} socketId
   * @returns {*}
   */
  _findGameBySocketId (socketId) {
    const game = this.state.games.find((/** @type {*} */g) => {
      const isHost = g.host === socketId

      if (isHost) {
        return true
      }

      if (g.opponents.includes(socketId)) {
        return true
      }

      return false
    })

    return game || null
  }

  /**
   * Looks up the user name for given socketId.
   *
   * @private
   * @param {string} socketId
   * @returns {string | null}
   */
  _resolveNameForId (socketId) {
    const user = this.state.users.find((/** @type {*} */user) => {
      return user.id === socketId
    })

    if (!user) {
      return null
    }

    return user.name
  }
}

const store = new Store(reducer)

// Export as Singleton
export default store
