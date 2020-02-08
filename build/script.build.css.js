const
  path = require('path'),
  fs = require('fs-extra'),
  shell = require('shelljs'),
  stylus = require('stylus'),
  sass = require('node-sass'),
  rtl = require('postcss-rtl'),
  postcss = require('postcss'),
  cssnano = require('cssnano'),
  autoprefixer = require('autoprefixer'),
  buildConf = require('./build.conf'),
  buildUtils = require('./build.utils'),
  pathList = [ path.join(__dirname, '../src/assets/styl') ]

// Copy Assets
fs.copy(path.resolve(__dirname, '../src/assets'), 'dist/assets', function (err) {
  if (err) return console.error(err)
  // Clean css dir
  shell.rm('-rf', path.resolve(__dirname, '../dist/assets/styl'))
  console.log('Assets dir copied')
})

const nano = postcss([
  cssnano({
    preset: ['default', {
      mergeLonghand: false,
      convertValues: false,
      cssDeclarationSorter: false,
      reduceTransforms: false
    }]
  })
])

Promise
  .all([
    generateStylusBase('src/assets/styl/app.styl'),
    generateStylusAddon(),
    generateStylusIcons()

    // generateSassFile('src/css/index.sass', 'dist/plugin.sass'),
    // validateSassFile('src/css/flex-addon.sass')
  ])
  .catch(e => {
    console.error(e)
    process.exit(1)
  })

function generateSassFile (source, destination) {
  const src = path.join(__dirname, '..', source)
  const dest = path.join(__dirname, '..', destination)

  return new Promise((resolve, reject) => {
    /*
     * Cannot use result.stats.includedFiles
     * because it does not contain variable only files
     */
    const deps = [ src ]

    // We do 2 things here: validate and build import graph
    sass.render({
      file: src,
      importer: [
        (url, prev, done) => {
          // needed for Windows as "prev"
          // comes with backward slashes
          prev = path.normalize(prev)

          const file = path.normalize(path.join(
            prev ? path.dirname(prev) : pathList[0],
            url
          ))

          // avoid duplicates
          if (deps.indexOf(file) === -1) {
            // insert in the right order
            if (prev) {
              deps.splice(deps.indexOf(prev), 0, file)
            }
            else {
              deps.push(file)
            }
          }

          done({ file })
        }
      ]
    }, (err) => {
      if (err) {
        reject(err)
        return
      }

      resolve(deps)
    })
  }).then(deps => getConcatenatedContent(deps))
    .then(code => buildUtils.writeFile(dest, code))
    .then(() => validateSassFile(destination))
}

function validateSassFile (src) {
  const file = path.join(__dirname, '..', src)

  return new Promise((resolve, reject) => {
    sass.render({ file }, (err) => {
      if (err) {
        reject(err)
        return
      }

      resolve(true)
    })
  })
}

function generateStylusBase (src) {
  // We do 2 things here: validate and get import graph
  const deps = stylus(buildUtils.readFile(src))
    .set('paths', pathList)
    .deps()

  return generateStylusFiles({
    sources: [src].concat(deps),
    styl: true
  })
}

function generateStylusAddon () {
  return generateStylusFiles({
    sources: [
      'src/assets/styl/variables.styl'
    ],
    name: '.addon'
  })
}

function generateStylusIcons () {
  return generateStylusFiles({
    sources: [
      'src/assets/styl/icons.styl'
    ],
    name: '.iconpack'
  })
}

function generateStylusFiles ({ sources, name = '', styl }) {
  return getConcatenatedContent(sources)
    .then(code => {
      code = code.replace(/~assets/g, '__ASSET_DIR__')
      code = code.replace(/\.\.\//g, '').replace(/assets\//g, './assets/')
      code = code.replace(/__ASSET_DIR__/g, './assets')
      if (styl) { return buildUtils.writeFile(`dist/plugin${name}.styl`, code) }
      else { return code }
    })
    .then(code => compileStylus(code))
    .then(code => postcss([ autoprefixer ]).process(code, { from: void 0 }))
    .then(code => {
      code.warnings().forEach(warn => {
        console.warn(warn.toString())
      })
      return code.css
    })
    .then(code => Promise.all([
      generateUMD(name, code),
      postcss([ rtl({}) ]).process(code, { from: void 0 }).then(code => generateUMD(name, code.css, '.rtl'))
    ]))
}

function generateUMD (name, code, ext = '') {
  return buildUtils.writeFile(`dist/plugin${name}${ext}.css`, code, true)
    .then(code => nano.process(code, { from: void 0 }))
    .then(code => buildUtils.writeFile(`dist/plugin${name}${ext}.min.css`, code.css, true))
}

function getConcatenatedContent (src, noBanner) {
  return new Promise((resolve, reject) => {
    let code = noBanner !== true
      ? buildConf.banner
      : ''

    src.forEach(function (file) {
      code += buildUtils.readFile(file) + '\n'
    })

    code = code
      // remove imports
      .replace(/@import\s+'[^']+'[\s\r\n]+/g, '')
      // remove comments
      .replace(/(\/\*[\w'-.,`\s\r\n*@]*\*\/)|(\/\/[^\r\n]*)/g, '')
      // remove unnecessary newlines
      .replace(/[\r\n]+/g, '\r\n')

    resolve(code)
  })
}

function compileStylus (code) {
  return new Promise((resolve, reject) => {
    stylus(code)
      .set('paths', pathList)
      .render((err, code) => {
        if (err) {
          console.log()
          reject(err)
        }
        else {
          resolve(code)
        }
      })
  })
}
