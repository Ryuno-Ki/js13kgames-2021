import { NAMES } from '../constants.js'

/**
 * Fetches list of player names.
 *
 * @param {*} req
 * @param {*} res
 */
export async function highscore (req, res) {
  // @ts-ignore
  const names = await storage.get(NAMES)

  res.send(names)
}
