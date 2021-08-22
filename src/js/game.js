/** @typedef {*} User */

/**
 * Game class
 */
export class Game {
  /**
   * @param {User} user
   * @param {Array<User>} opponents
   */
  constructor (user, opponents) {
    this.user = user
    this.opponents = opponents
  }

  /**
   * Start new game
   */
  start () {
    const user = this.user
    const self = this

    this.opponents.forEach((opponent) => {
      user.start(self, opponent)
      opponent.start(self, user)
    })
  }

  /**
   * Has game ended?
   *
   * @return {boolean}
   */
  ended () {
    return false
  }

  /**
   * Final score
   */
  score () {
  }
}
