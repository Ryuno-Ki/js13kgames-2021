import { MAXIMUM_NUMBER_OF_VERTICES } from '../../constants.js'
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
  }

  /** @param {Action} action */
  dispatch (action) {
    this.state = this.reducer(this.state, action)
    logger.debug('State', this.getState())
    // TODO: Persist state in storage here?
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

      const isOpponent = !!g.opponents.find(
        (/** @type {*} */opponent) => opponent.id === socketId
      )

      if (isOpponent) {
        return true
      }

      return false
    })

    return game || null
  }
}

const store = new Store(reducer)

// Export as Singleton
export default store
