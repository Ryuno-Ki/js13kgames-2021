const fs = require('fs')
const path = require('path')

const zip = require('zip-dir')

const MAX_BYTES = 13312
const distFolder = path.join(__dirname, '..', 'dist')
const filename = path.join(__dirname, '..', 'js13kgames.zip')

function zipDirectory (directory, targetFile, callback) {
  zip(distFolder, { saveTo: targetFile }, (error) => {
    if (error) {
      process.exit(2)
    }
    console.log(`Zipped ${ directory }`)
    callback()
  })
}

function getFilesizeInBytes (filename) {
    return fs.statSync(filename).size
}

function fileIsUnderMaxSize (fileSize) {
    return fileSize <= MAX_BYTES
}

zipDirectory(distFolder, filename, () => {
  fileSize = getFilesizeInBytes(filename)
  fileSizeDifference = Math.abs(MAX_BYTES - fileSize)

  if (fileIsUnderMaxSize(fileSize)) {
      console.log(`The file is ${fileSize} bytes (${fileSizeDifference} bytes under the limit).`)
      process.exit(0)
  } else {
      console.log(`The file is ${fileSize} bytes (${fileSizeDifference} bytes over the limit).`)
      process.exit(1)
  }
})
