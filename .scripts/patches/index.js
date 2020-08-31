const { chmod, copyFile, readdir, writeFile } = require('fs').promises
const path = require('path')
const { apply, pathExists } = require('../utils')

exports.runAllPatches = async () => {
  const unpluggedDir = path.resolve(process.cwd(), '.yarn', 'unplugged')
  const unpluggedPkgs = await readdir(unpluggedDir)

  const patchFiles = (await readdir(__dirname))
    .filter(patchFile => patchFile !== 'index.js')
    .map(patchFile => {
      const moduleName = patchFile.slice(0, -3)
      const modulePkgs = unpluggedPkgs
        .filter(pkg => pkg.startsWith(moduleName))
        .map(pkg => path.resolve(unpluggedDir, pkg, 'node_modules', moduleName))

      const { file, fileCopy, patch } = require(`./${moduleName}`).default

      return () =>
        Promise.all(
          modulePkgs.map(pkg => patchPkg(pkg, { file, fileCopy, patch }))
        )
    })

  await Promise.all(patchFiles.map(apply))
}

const patchPkg = async (pkg, { file, fileCopy, patch }) => {
  const fileCopyPath = path.resolve(pkg, fileCopy)

  if (await pathExists(fileCopyPath)) {
    return
  }

  const filePath = path.resolve(pkg, file)

  await copyFile(filePath, fileCopyPath)
  await writeFile(filePath, patch)

  await Promise.all([filePath, fileCopyPath].map(path => chmod(path, 0o775)))
}
