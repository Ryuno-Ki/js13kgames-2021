import { dom } from './dom.js'
import { navigate } from './navigate.js'

/**
 * Navigates to game over scene.
 */
export function onGameOver () {
  updateHighscoreTable().then((highscore) => {
    updateTweet(highscore)
    navigate('fin')
  })
}

function updateHighscoreTable () {
  return fetch('/highscore')
    .then((response) => response.json())
    .then((/** @type {*} */highscore) => {
      const head = `<thead><tr>${
        ['Name', 'Role', 'Score']
          .map((headline) => `<th scope="column">${headline}</th>`)
          .join('')
      }</tr></thead>`

      const body = `<tbody>${
        highscore
          // @ts-ignore
          .map(({ name, role, score }) => {
            return `<tr><td>${name}</td><td>${role}</td><td>${score}</td></tr>`
          })
          .join('')
      }</tbody>`

      // @ts-ignore
      dom.highscore.innerHTML = head + body
      return highscore
    })
    .catch((err) => {
      console.error(err)
      return null
    })
}

/**
 * Updates the tweet share text and link.
 *
 * @param {*} highscore
 */
function updateTweet (highscore) {
  if (!dom.highscoreName || !dom.tweet) {
    return
  }

  const name = dom.highscoreName.textContent
  const score = highscore.find((/** @type {*} */h) => h.name === name)
  const shareText = score
    ? `I played Lido Space and scored ${score.score} as ${score.role}!`
    : 'I played Lido Space.'

  const url = encodeURIComponent(location.href.replace(location.hash, ''))
  const text = encodeURIComponent(shareText)
  const hashtags = ['js13k', 'js13kgames'].map(encodeURIComponent).join(',')
  const via = 'AndreJaenisch'
  dom.tweet.href = `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${hashtags}&via=${via}`
  dom.tweet.textContent = 'Share your score'
}
