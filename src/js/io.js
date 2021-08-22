import { Game } from './game.js'
import { User } from './user.js'
import { users } from './users.js'

/** @typedef {*} Socket */

/**
 * Socket.io wrapper
 *
 * @param {Socket} socket
 */
export function io (socket) {
  const user = new User(socket)
  users.push(user)

  socket.on('disconnect', () => onDisconnect(socket, user))
  socket.on('keyUp', (/** @type {object} */details) => {
    onKeyUp(socket, user, details)
  })

  findOpponents(user)
  console.log(`Connected: ${socket.id}`)
}

/**
 * Search for an opponent.
 *
 * @param {User} user
 */
function findOpponents (user) {
  users.forEach(function (u) {
    if (u.socket.id !== user.socket.id && u.opponents.length === 0) {
      // @ts-ignore
      user.setRole(ROLE_HOST)
      // @ts-ignore
      u.setRole(ROLE_OPPONENT)
      new Game(user, [u]).start()
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

/**
 * Sync all players about keyup.
 *
 * @param {Socket} socket
 * @param {User} user
 * @param {object} details
 */
async function onKeyUp (socket, user, details) {
  try {
    await updateStorage()
  } catch (exc) {
    console.error(exc)
  }

  user.opponents.forEach((opponent) => {
    opponent.socket.emit('sync', details)
  })
}

/**
 * Update this session in storage.
 * */
async function updateStorage () {
  // @ts-ignore
  const games = storage.get('games', 0)
  // @ts-ignore
  await storage.set('games', games + 1)
}
