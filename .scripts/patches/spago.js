const file = 'spago'
const fileCopy = 'spago2'

exports.default = {
  file: file,
  fileCopy: fileCopy,
  patch: `

const path = require('path')
const { spawn } = require('child_process')
const spago = path.resolve(__dirname, '${fileCopy}')

spawn(spago, process.argv.slice(2), {
  detached: true,
  stdio: 'inherit'
})

`.trim()
}
