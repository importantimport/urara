import { promises as fs } from 'fs'
import * as path from 'path'
import chokidar from 'chokidar'
import chalk from 'chalk'

const output = (color, msg, filepath) =>
  console.log(
    `${chalk.dim(new Date().toLocaleTimeString())} ${chalk.magenta.bold(`[urara]`)} ${chalk[color](msg)} ${
      filepath ? chalk.dim(filepath) : chalk.dim('')
    }`
  )

async function mkDir(dir) {
  await fs.mkdir(dir, { recursive: true }).then(() => output('yellow', 'make dir', dir))
}

async function rmDir(dir) {
  await fs.rm(dir, { recursive: true }).then(() => output('red', 'remove dir', dir))
}

async function rm(dir) {
  await fs.readdir(dir, { withFileTypes: true }).then(files => {
    for (let file of files) {
      if (file.isDirectory())
        fs.rm(path.join(dir, file.name), { recursive: true }).then(() => output('red', 'remove dir', path.join(dir, file.name)))
    }
  })
}

async function cp(dir) {
  await fs.readdir(dir, { withFileTypes: true }).then(files => {
    for (let file of files) {
      if (file.isDirectory()) {
        fs.mkdir(path.join(`src/routes`, dir.slice(6), file.name), { recursive: true }).then(() =>
          output('yellow', 'make dir', path.join(`src/routes`, dir.slice(6), file.name))
        )
        fs.mkdir(path.join(`static`, dir.slice(6), file.name), { recursive: true }).then(() =>
          output('yellow', 'make dir', path.join(`src/routes`, dir.slice(6), file.name))
        )
        cp(path.join(dir, file.name))
      } else if (!/(^[.#]|(?:__|~)$)/.test(file.name)) {
        ;/\.(svelte|svx|md|js|ts)$/i.test(file.name)
          ? fs
              .copyFile(path.join(dir, file.name), path.join(`src/routes/`, dir.slice(6), file.name))
              .then(() => output('green', 'copy file', path.join(`src/routes`, dir.slice(6), file.name)))
          : fs
              .copyFile(path.join(dir, file.name), path.join(`static`, dir.slice(6), file.name))
              .then(() => output('green', 'copy file', path.join(`static`, dir.slice(6), file.name)))
      }

      // if (/\.(svx|md|js|ts)$/i.test(file.name)) {
      // 	fs.copyFile(
      // 		path.join(dir, file.name),
      // 		path.join(`src/routes/`, dir.slice(6), file.name)
      // 	).then(() => output('green', 'copy file', path.join(`src/routes`, dir.slice(6), file.name)))
      // } else {
      // 	fs.copyFile(path.join(dir, file.name), path.join(`static`, dir.slice(6), file.name)).then(
      // 		() => output('green', 'copy file', path.join(`static`, dir.slice(6), file.name))
      // 	)
      // }
    }
  })
}

async function watchAdd(file, unlink = false) {
  let pathAdd
  ;/\.(svelte|svx|md|js|ts)$/i.test(path.parse(file).ext) ? (pathAdd = `src/routes`) : (pathAdd = `static`)
  if (unlink === true)
    fs.rm(path.join(pathAdd, file.slice(6))).then(() =>
      fs
        .copyFile(file, path.join(pathAdd, file.slice(6)))
        .then(() => output('green', 'update file', path.join(pathAdd, file.slice(6))))
    )
  else
    fs.copyFile(file, path.join(pathAdd, file.slice(6))).then(() =>
      output('green', 'copy file', path.join(pathAdd, file.slice(6)))
    )
}

async function watchAddDir(dir) {
  fs.mkdir(path.join(`src/routes`, dir.slice(6)), { recursive: true })
    .then(() =>
      fs
        .mkdir(path.join(`static`, dir.slice(6)), { recursive: true })
        .then(() => output('yellow', 'make dir', path.join(`static`, dir.slice(6))))
    )
    .then(() => output('yellow', 'make dir', path.join(`src/routes`, dir.slice(6))))
}

async function watchUnlink(file) {
  let pathAdd
  ;/\.(svelte|svx|md|js|ts)$/i.test(path.parse(file).ext) ? (pathAdd = `src/routes`) : (pathAdd = `static`)
  fs.rm(path.join(pathAdd, file.slice(6)), { foece: true, recursive: true }).then(() =>
    output('red', 'remove file', path.join(pathAdd, file.slice(6)))
  )
}

async function watchUnlinkDir(dir) {
  fs.rm(path.join(`src/routes`, dir.slice(6)), { force: true, recursive: true })
    .then(() =>
      fs
        .rm(path.join(`static`, dir.slice(6)), { force: true, recursive: true })
        .then(() => output('red', 'remove dir', path.join(`static`, dir.slice(6))))
    )
    .then(() => output('red', 'remove dir', path.join(`src/routes`, dir.slice(6))))
}

switch (process.argv[2]) {
  case 'watch':
    {
      let watcher = chokidar.watch(`urara`, {
        ignored: file => /(^[.#]|(?:__|~)$)/.test(path.basename(file))
      })
      watcher
        .on('add', file => watchAdd(file))
        .on('change', file => watchAdd(file, true))
        .on('unlink', file => watchUnlink(file))
        .on('addDir', dir => watchAddDir(dir))
        .on('unlinkDir', dir => watchUnlinkDir(dir))
        .on('error', error => output('red', 'error', error))
        .on('ready', () => output('cyan', 'initial scan complete. ready for changes'))
      process.on('SIGINT', () => {
        output('red', 'existing...')
        rm(`src/routes`)
        rm(`static`)
        watcher.close()
      })
    }
    break
  case 'build':
    mkDir(`static`)
    cp(`urara`)
    break
  case 'clean':
    rmDir(`static`)
    rm(`src/routes`)
    break
  case '404':
    console.log('TODO')
    break
  default:
    output('red', 'error', 'invalid arguments')
    break
}
