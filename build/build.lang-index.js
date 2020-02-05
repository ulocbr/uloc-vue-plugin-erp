const
  glob = require('glob'),
  path = require('path'),
  fs = require('fs'),
  { logError, writeFile } = require('./build.utils')

const
  root = path.resolve(__dirname, '..'),
  resolve = file => path.resolve(root, file)

function parse (prop, txt) {
  const
    propIndex = txt.indexOf(prop),
    startIndex = txt.indexOf(`'`, propIndex) + 1

  let stopIndex = txt.indexOf(`'`, startIndex)

  while (txt.charAt(stopIndex - 1) === '\\') {
    stopIndex = txt.indexOf(`'`, stopIndex + 1)
  }

  return txt.substring(startIndex, stopIndex).replace('\\', '')
}

module.exports.generate = function () {
  const languages = []

  try {
    glob.sync(resolve('lang/*.js'))
      .filter(file => file.endsWith('.js'))
      .forEach(file => {
        const content = fs.readFileSync(file, 'utf-8')
        const name = parse('name', content)
        const label = parse('label', content)
        languages.push({ name, label })
      })

    const
      langFile = resolve('lang/index.json'),
      newLangJson = JSON.stringify(languages, null, 2)

    let oldLangJson = ''

    try {
      oldLangJson = fs.readFileSync(langFile, 'utf-8')
    }
    catch (e) { }

    if (newLangJson.split(/[\n\r]+/).join('\n') !== oldLangJson.split(/[\n\r]+/).join('\n')) {
      writeFile(langFile, newLangJson)
    }
  }
  catch (err) {
    logError(`build.lang-index.js: something went wrong...`)
    console.log()
    console.error(err)
    console.log()
    process.exit(1)
  }
}
