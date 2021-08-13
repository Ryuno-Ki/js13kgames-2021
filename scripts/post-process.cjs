const fs = require('fs')
const path = require('path')

const jsdom = require('jsdom')

const { JSDOM } = jsdom
const distFolder = path.join(__dirname, '..', 'dist')
const indexHtmlFilePath = path.join(distFolder, 'index.html')

async function deleteFile (filePath) {
  console.log('Clean up ', filePath)
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (error) => {
      if (error) {
        reject(error)
      }
      resolve()
    })
  })
}

async function cleanUp (scriptFileName, styleFileName) {
  return Promise.all([
    deleteFile(scriptFileName),
    deleteFile(styleFileName)
  ])
}

async function extractScriptFileName (htmlString) {
  const dom = new JSDOM(htmlString)
  const document = dom.window.document
  const scriptElement = document.querySelector('script')
  const scriptSrc = scriptElement.getAttribute('src')
  const scriptFileName = path.join(distFolder, scriptSrc)
  return scriptFileName
}

async function inlineScript (htmlString, scriptSrc) {
  const dom = new JSDOM(htmlString)
  const document = dom.window.document
  const scriptElement = document.querySelector('script')

  const script = document.createElement('script')
  const source = document.createTextNode(scriptSrc)
  script.appendChild(source)
  scriptElement.parentNode.replaceChild(script, scriptElement)
  return Promise.resolve(document.documentElement.outerHTML)
}

async function extractStyleFileName (htmlString) {
  const dom = new JSDOM(htmlString)
  const document = dom.window.document
  const linkElement = document.querySelector('link[rel="stylesheet"]')
  const styleSrc = linkElement.getAttribute('href')
  const styleFileName = path.join(distFolder, styleSrc)
  return styleFileName
}

async function inlineStyle (htmlString, styleSrc) {
  const dom = new JSDOM(htmlString)
  const document = dom.window.document
  const linkElement = document.querySelector('link[rel="stylesheet"]')

  const style = document.createElement('style')
  const source = document.createTextNode(styleSrc)
  style.appendChild(source)  // TODO: Should work with replaceChild, too?

  linkElement.remove()
  document.head.appendChild(style)
  return Promise.resolve(document.documentElement.outerHTML)
}

async function updateFile (originalHtmlString, updatedHtmlString) {
  const dom = new JSDOM(originalHtmlString)
  const doctype = dom.window.document.doctype
  const content = [
    '<!DOCTYPE ',
    doctype.name,
    doctype.internalSubset,
    doctype.publicId,
    doctype.systemId,
    '>'
  ].join('') + '\n' + updatedHtmlString

  return new Promise((resolve, reject) => {
    fs.writeFile(indexHtmlFilePath, content, (error) => {
      if (error) {
        return reject(error)
      }
      resolve(updatedHtmlString)
    })
  })
}

function parseFile (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, content) => {
      if (error) {
        return reject(error)
      }

      resolve(content)
    })
  })
}

async function run () {
  let htmlString = ''
  let updatedHtmlString = htmlString

  try {
    htmlString = await parseFile(indexHtmlFilePath)
  } catch (exc) {
    console.error(exc)
    return process.exit(1)
  }

  const scriptFileName = await extractScriptFileName(htmlString)
  const styleFileName = await extractStyleFileName(htmlString)

  try {
    const scriptSrc = await parseFile(scriptFileName)
    updatedHtmlString = await inlineScript(htmlString, scriptSrc)
  } catch (exc) {
    console.error(exc)
    return process.exit(2)
  }

  try {
    const styleSrc = await parseFile(styleFileName)
    updatedHtmlString = await inlineStyle(updatedHtmlString, styleSrc)
  } catch (exc) {
    console.error(exc)
    return process.exit(3)
  }

  try {
    await updateFile(htmlString, updatedHtmlString)
  } catch (exc) {
    console.error(exc)
    process.exit(4)
  }

  try {
    cleanUp(scriptFileName, styleFileName)
  } catch (exc) {
    console.error(exc)
    return process.exit(5)
  }
}

run()
