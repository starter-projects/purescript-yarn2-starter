const { requireRootWorkspace } = require('../utils')
const { runAllPatches } = require('../patches')

async function main() {
  requireRootWorkspace()
  await runAllPatches()
}

main().catch(console.error)
