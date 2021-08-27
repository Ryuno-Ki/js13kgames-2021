import { reducer } from './reducers/index.js'
/** @typedef {import('./actions/add-name').Action} AddNameAction */
/** @typedef {import('./actions/update-name').Action} UpdateNameAction */
/** @typedef {import('./actions/remove-user').Action} RemoveUserAction */
/** @typedef {AddNameAction | UpdateNameAction | RemoveUserAction} Action */

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
    // TODO: Persist state in storage here?
  }
}

const store = new Store(reducer)

// Export as Singleton
export default store
