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
      const party = /** @type {Array<User>} */([])
        .concat(this.opponents)
        .concat(user)

      user.start(self, party.filter((u) => u.socket.id !== user.socket.id))
      opponent.start(
        self,
        party.filter((u) => u.socket.id !== opponent.socket.id)
      )
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
