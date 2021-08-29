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

  getState () {
    return this.state
  }

  /** @param {Action} action */
  dispatch (action) {
    this.state = this.reducer(this.state, action)
    logger.debug('State', this.getState())
    // TODO: Persist state in storage here?
  }
}

const store = new Store(reducer)

// Export as Singleton
export default store
