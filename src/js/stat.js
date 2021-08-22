/* global: storage */

/**
 * Report some statistics
 *
 * @param {*} req
 * @param {*} res
 */
export async function stat (req, res) {
  // @ts-ignore
  const games = await storage.get('games', 0)
  res.send(`<h1>Games played: ${games}</h1>`)
}
