/**
 * Urara.JS
 * Version: 200
 */

import { promises as fs } from 'fs'
import * as path from 'path'
import chokidar from 'chokidar'
import chalk from 'chalk'

const config = {
  extensions: ['svelte', 'md', 'js', 'ts'],
  rename: ['404'],
  catch: ['ENOENT', 'EEXIST']
}

const check = ext => (config.extensions.includes(ext) ? 'src/routes' : 'static')

const log = (color, msg, dest) =>
  console.log(
    chalk.dim(new Date().toLocaleTimeString() + ' ') +
      chalk.magentaBright.bold('[urara] ') +
      chalk[color](msg + ' ') +
      chalk.dim(dest ?? '')
  )

const error = err => {
  if (config.catch.includes(err.code)) {
    console.log(
      chalk.dim(new Date().toLocaleTimeString() + ' ') +
        chalk.redBright.bold('[urara] ') +
        chalk.red('error ') +
        chalk.dim(err.message)
    )
  } else {
    throw err
  }
}

const cpFile = (src, { stat = 'copy', dest = path.join(check(path.parse(src).ext.slice(1)), src.slice(6)) } = {}) =>
  fs
    .copyFile(src, dest)
    .then(log('green', `${stat} file`, dest))
    .catch(error)

const rmFile = (src, { dest = path.join(check(path.parse(src).ext.slice(1)), src.slice(6)) } = {}) =>
  fs.rm(dest).then(log('yellow', 'remove file', dest)).catch(error)

const cpDir = src =>
  fs.readdir(src, { withFileTypes: true }).then(files =>
    files.forEach(file => {
      const dest = path.join(src, file.name)
      if (file.isDirectory()) {
        mkDir(dest)
        cpDir(dest)
      } else if (file.name.startsWith('.')) {
        log('cyan', 'ignore file', dest)
      } else {
        cpFile(dest)
      }
    })
  )

const mkDir = (src, { dest = [path.join('src/routes', src.slice(6)), path.join('static', src.slice(6))] } = {}) => {
  dest.forEach(path => fs.mkdir(path).then(log('green', 'make dir', path)).catch(error))
}

const rmDir = (src, { dest = [path.join('src/routes', src.slice(6)), path.join('static', src.slice(6))] } = {}) => {
  dest.forEach(path => fs.rm(path, { force: true, recursive: true }).then(log('yellow', 'remove dir', path)).catch(error))
}

const cleanDir = src =>
  fs.readdir(src, { withFileTypes: true }).then(files => {
    files.forEach(file => {
      const dest = path.join(src, file.name)
      file.isDirectory() ? rmDir(dest) : file.name.startsWith('.') ? log('cyan', 'ignore file', dest) : rmFile(dest)
    })
  })

const build = () => {
  mkDir('static', { dest: ['static'] })
  cpDir('urara')
}

const clean = () => {
  cleanDir('urara')
  rmDir('static', { dest: ['static'] })
}

const rename = () => {
  fs.readdir('build', { withFileTypes: true }).then(files =>
    files.forEach(file => {
      if (file.isDirectory() && config.rename.includes(file.name)) {
        log('cyan', 'find', file.name)
        const src = path.join('build', file.name, 'index.html')
        const dest = path.join('build', file.name + '.html')
        fs.copyFile(src, dest)
          .then(log('green', 'copy file', dest))
          .then(fs.rm(src).then(log('yellow', 'remove file', src)).catch(error))
          .catch(error)
      }
    })
  )
}

switch (process.argv[2]) {
  case 'watch':
    {
      let watcher = chokidar.watch('urara', {
        ignored: file => path.basename(file).startsWith('.')
      })
      watcher
        .on('add', file => cpFile(file))
        .on('change', file => cpFile(file, { stat: 'update' }))
        .on('unlink', file => rmFile(file))
        .on('addDir', dir => mkDir(dir))
        .on('unlinkDir', dir => rmDir(dir))
        .on('error', error => log('red', 'error', error))
        .on('ready', () => log('cyan', 'copy complete. ready for changes'))
      process
        .on('SIGINT', () => {
          log('red', 'sigint')
          clean()
          watcher?.close()
        })
        .on('SIGTERM', () => {
          log('red', 'sigterm')
          watcher?.close()
        })
        .on('exit', () => {
          log('red', 'exit')
        })
    }
    break
  case 'build':
    build()
    break
  case 'clean':
    clean()
    break
  case 'rename':
    rename()
    break
  default:
    log('red', 'error', 'invalid arguments')
    break
}
