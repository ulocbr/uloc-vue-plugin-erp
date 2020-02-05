process.env.BABEL_ENV = 'production'

const path = require('path')
const fs = require('fs')
const rollup = require('rollup')
const uglify = require('uglify-es')
const buble = require('@rollup/plugin-buble')
const json = require('@rollup/plugin-json')
const commonjs = require('@rollup/plugin-commonjs')
const vue = require('rollup-plugin-vue')
const async = require('rollup-plugin-async')
const autoExternal = require('rollup-plugin-auto-external')
const nodeResolve = require('rollup-plugin-node-resolve')
const buildConf = require('./build.conf')
const buildUtils = require('./build.utils')

const bubleConfig = {
  objectAssign: 'Object.assign',
  transforms: { asyncAwait: false }
}

const defaultRollupPlugins = [
  nodeResolve({
    extensions: ['.js', '.vue'],
    preferBuiltins: false
  }),
  json(),
  commonjs(),
  vue({
    compileTemplate: true,
    htmlMinifier: { collapseBooleanAttributes: false },
    template: {
      transformAssetUrls: true
    }
  }),
  autoExternal(),
  buble(bubleConfig),
  async()
]

const builds = [
  {
    rollup: {
      input: {
        input: resolve(`src/index.esm.js`)
      },
      output: {
        file: resolve(`dist/index.esm.js`),
        format: 'es'
      }
    },
    build: { minified: true, minExt: false }
  },
  {
    rollup: {
      input: {
        input: resolve(`src/index.js`)
      },
      output: {
        file: resolve(`dist/index.common.js`),
        format: 'cjs'
      }
    },
    build: {
      minified: true,
      minExt: false
    }
  }
]

// addAssets(builds, 'lang', 'lang')
// addAssets(builds, 'icon-set', 'iconSet')

build(builds)

/**
 * Helpers
 */

function resolve (_path) {
  return path.resolve(__dirname, '..', _path)
}

function addAssets (builds, type, injectName) {
  const
    files = fs.readdirSync(resolve(type)),
    plugins = [buble(bubleConfig)]

  files
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
      const name = file.substr(0, file.length - 3).replace(/-([a-z])/g, g => g[1].toUpperCase())
      builds.push({
        rollup: {
          input: {
            input: resolve(`${type}/${file}`),
            plugins
          },
          output: {
            file: addExtension(resolve(`dist/${type}/${file}`), 'umd'),
            format: 'umd',
            name: `Uloc.${injectName}.${name}`
          }
        },
        build: {
          minified: true
        }
      })
    })
}

function build (builds) {
  return Promise
    .all(builds.map(genConfig).map(buildEntry))
    .catch(buildUtils.logError)
}

function genConfig (opts) {
  if (opts.rollup.input.plugins === void 0) {
    opts.rollup.input.plugins = defaultRollupPlugins
  }

  opts.rollup.input.external = opts.rollup.input.external || []
  opts.rollup.input.external.push('vue')

  opts.rollup.output.banner = buildConf.banner
  opts.rollup.output.name = opts.rollup.output.name || 'UlocVueAuth'

  opts.rollup.output.globals = opts.rollup.output.globals || {}
  opts.rollup.output.globals.vue = 'Vue'
  opts.rollup.output.globals['uloc-vue'] = 'uloc-vue'
  opts.rollup.output.globals.axios = 'axios'
  opts.rollup.output.globals.moment = 'moment'

  opts.rollup.output.exports = 'named'

  if (opts.env) {
    opts.rollup.input.plugins.unshift(
      /* replace({
        'process.env.NODE_ENV': JSON.stringify(opts.env)
      }) */
    )
  }
  return opts
}

function addExtension (filename, ext = 'min') {
  const insertionPoint = filename.lastIndexOf('.')
  return `${filename.slice(0, insertionPoint)}.${ext}${filename.slice(insertionPoint)}`
}

function injectVueRequirement (code) {
  const index = code.indexOf(`Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue`)

  if (index === -1) {
    return code
  }

  const checkMe = ` if (Vue === void 0) {
    console.error('[ UlocAuth ] Vue is required to run.')
    return
  }
  `

  return code.substring(0, index - 1) +
    checkMe +
    code.substring(index)
}

function buildEntry (config) {
  return rollup
    .rollup(config.rollup.input)
    .then(bundle => bundle.generate(config.rollup.output))
    .then(({ output }) => {
      const code = config.rollup.output.format === 'umd'
        ? injectVueRequirement(output[0].code)
        : output[0].code

      return config.build.unminified
        ? buildUtils.writeFile(config.rollup.output.file, code)
        : code
    })
    .then(code => {
      if (!config.build.minified) {
        return code
      }

      const minified = uglify.minify(code, {
        compress: {
          pure_funcs: ['makeMap']
        }
      })

      if (minified.error) {
        return Promise.reject(minified.error)
      }

      return buildUtils.writeFile(
        config.build.minExt !== false
          ? addExtension(config.rollup.output.file)
          : config.rollup.output.file,
        buildConf.banner + minified.code,
        true
      )
    })
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
}

/**
 * Languages
 */
require('./build.lang-index').generate()
