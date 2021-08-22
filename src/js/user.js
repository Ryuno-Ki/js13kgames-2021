/* global: ROLE_UNKNOWN */

/** @typedef {*} Game */
/** @typedef {*} Socket */

/**
 * User session class
 */
export class User {
  /**
   * @param {Socket} socket
   */
  constructor (socket) {
    this.socket = socket
    this.game = null
    /** @type {Array<User>} */
    this.opponents = []
    // @ts-ignore
    this.role = ROLE_UNKNOWN
  }

  /**
   * Assigns the role in the current party.
   *
   * @param {string} role
   */
  setRole (role) {
    this.role = role
  }

  /**
   * Start new game
   *
   * @param {Game} game
   * @param {Array<User>} opponents
   */
  start (game, opponents) {
    this.game = game
    this.opponents = opponents
    this.socket.emit(
      'start',
      { role: this.role, opponents: this.opponents.length, spectators: 0 }
    )
  }

  /**
   * Terminate game
   */
  end () {
    this.game = null
    this.opponents = []
    // @ts-ignore
    this.role = ROLE_UNKNOWN
    this.socket.emit('end')
  }

  /**
   * Trigger win event
   */
  win () {
    this.opponents.forEach((opponent) => {
      this.socket.emit('win')
    })
  }

  /**
   * Trigger lose event
   */
  loose () {
    this.opponents.forEach((opponent) => {
      this.socket.emit('loose')
    })
  }

  /**
   * Trigger draw event
   */
  draw () {
    this.opponents.forEach((opponent) => {
      this.socket.emit('draw')
    })
  }
}
