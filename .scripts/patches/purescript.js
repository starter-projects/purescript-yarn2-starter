const file = 'purs.bin'
const fileCopy = 'purs2.bin'

exports.default = {
  file: file,
  fileCopy: fileCopy,
  patch: `

const path = require('path')
const { spawn } = require('child_process')
const purs = path.resolve(__dirname, '${fileCopy}')

spawn(purs, process.argv.slice(2), {
  detached: true,
  stdio: 'inherit'
})

`.trim()
}
