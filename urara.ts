/**
 * Urara.TS
 * Version: Any
 */

import { promises as fs } from 'fs'
import * as path from 'path'
import chokidar from 'chokidar'
import chalk from 'chalk'

const config = {
  extensions: {
    posts: ['md'],
    images: ['jpg', 'png', 'webp', 'avif']
  },
  images: [''],
  catch: ['ENOENT', 'EEXIST']
}

const check = (ext: string) => (config.extensions.posts.includes(ext) ? 'src/routes' : 'static')

const log = (color: string, msg: string, dest?: string | Error) =>
  console.log(
    chalk.dim(new Date().toLocaleTimeString() + ' ') +
      chalk.magentaBright.bold('[urara] ') +
      chalk[color](msg + ' ') +
      chalk.dim(dest ?? '')
  )

const error = (err: { code: string; message: unknown }) => {
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

const cpFile = (src: string, { stat = 'copy', dest = path.join(check(path.parse(src).ext.slice(1)), src.slice(6)) } = {}) =>
  config.extensions.images.includes(path.parse(src).ext.slice(1))
    ? fs
        .copyFile(src, path.join('src/static', src.slice(6)))
        .then(() => fs.copyFile(src, path.join('static', src.slice(6))))
        .then(() => log('green', `${stat} file`, dest))
        .catch(error)
    : fs
        .copyFile(src, dest)
        .then(() => log('green', `${stat} file`, dest))
        .catch(error)

const rmFile = (src: string, { dest = path.join(check(path.parse(src).ext.slice(1)), src.slice(6)) } = {}) =>
  config.extensions.images.includes(path.parse(src).ext.slice(1))
    ? fs
        .rm(path.join('src/static', src.slice(6)))
        .then(() => fs.rm(path.join('static', src.slice(6))))
        .then(() => log('yellow', 'remove file', dest))
        .catch(error)
    : fs
        .rm(dest)
        .then(() => log('yellow', 'remove file', dest))
        .catch(error)

const cpDir = (src: string) =>
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

const mkDir = (
  src: string,
  {
    dest = [path.join('src/routes', src.slice(6)), path.join('static', src.slice(6)), path.join('src/static', src.slice(6))]
  } = {}
) => {
  dest.forEach(path =>
    fs
      .mkdir(path)
      .then(() => log('green', 'make dir', path))
      .catch(error)
  )
}

const rmDir = (
  src: string,
  {
    dest = [path.join('src/routes', src.slice(6)), path.join('static', src.slice(6)), path.join('src/static', src.slice(6))]
  } = {}
) => {
  dest.forEach(path =>
    fs
      .rm(path, { force: true, recursive: true })
      .then(() => log('yellow', 'remove dir', path))
      .catch(error)
  )
}

const cleanDir = (src: string) =>
  fs.readdir(src, { withFileTypes: true }).then(files => {
    files.forEach(file => {
      const dest = path.join(src, file.name)
      file.isDirectory() ? rmDir(dest) : file.name.startsWith('.') ? log('cyan', 'ignore file', dest) : rmFile(dest)
    })
  })

const build = () => {
  mkDir('static', { dest: ['static'] })
  mkDir('src/static', { dest: ['src/static'] })
  cpDir('urara')
}

const clean = () => {
  cleanDir('urara')
  rmDir('static', { dest: ['static'] })
  rmDir('src/static', { dest: ['src/static'] })
}

switch (process.argv[2]) {
  case 'watch':
    {
      const watcher = chokidar.watch('urara', {
        ignored: (file: string) => path.basename(file).startsWith('.')
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
  default:
    log('red', 'error', 'invalid arguments')
    break
}
