/**
 * Entry point into the game.
 *
 * @returns {void}
 */
export function app () {
  const game = document.getElementById('game')
  if (!game) {
    console.error('Could not start game!')
    return
  }

  const context = /** @type {HTMLCanvasElement} */(game).getContext('2d')
  console.log('Painting onto', context)
}
