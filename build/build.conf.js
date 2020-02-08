const version = process.env.VERSION || require('../package.json').version

module.exports = {
  version,
  banner:
    '/*!\n' +
    ' * ERP Layout Plugin v' + version + '\n' +
    ' * Uloc Framework\n' +
    ' * (c) 2020-present Tiago Felipe\n' +
    ' * Released under the MIT License.\n' +
    ' */\n'
}
