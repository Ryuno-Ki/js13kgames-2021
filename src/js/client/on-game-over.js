import { dom } from './dom.js'
import { navigate } from './navigate.js'

/**
 * Navigates to game over scene.
 */
export function onGameOver () {
  fetch('/highscore')
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
      navigate('fin')
    })
    .catch((err) => {
      console.error(err)
      navigate('fin')
    })
}
