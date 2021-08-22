import { Game } from './game.js'
import { User } from './user.js'
import { users } from './users.js'

/**
 * Socket.io wrapper
 *
 * @param {*} socket
 */
export function io (socket) {
  const user = new User(socket)
  users.push(user)

  socket.on('disconnect', () => onDisconnect(socket, user))
  console.log(`Connected: ${socket.id}`)
}

/**
 * Search for an opponent.
 *
 * @param {User} user
 */
function findOpponents (user) {
  users.forEach(function (u) {
    if (u !== user && u.opponents.length === 0) {
      new Game(user, u).start()
    }
  })
}

/**
 * Forget about this user.
 *
 * @param {User} user
 */
function removeUser (user) {
  users.splice(users.indexOf(user), 1)
}

/**
 * Clean up on disconnect.
 *
 * @param {*} socket
 * @param {User} user
 */
function onDisconnect (socket, user) {
  console.log(`Disconnected: ${socket.id}`)
  removeUser(user)

  if (user.opponents.length > 0) {
    user.opponents.forEach(function (opponent) {
      opponent.end()
      findOpponents(opponent)
    })
  }
}
