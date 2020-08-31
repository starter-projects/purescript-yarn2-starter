const fs = require('fs').promises
const path = require('path')

exports.requireRootWorkspace = (() => {
  const rootDir = path.resolve(__dirname, '..', '..')

  return () => {
    const actual = process.cwd()
    if (actual === rootDir) {
      return
    }
    const errorMessage = `This script must be run from workspace root directory

        - Workspace directory: ${rootDir}

        - Process directory  : ${actual}

`
    console.trace(errorMessage)
    process.exit(-1)
  }
})()

exports.apply = fn => fn()

exports.pathExists = async path =>
  fs
    .access(path)
    .then(_ => true)
    .catch(_ => false)
