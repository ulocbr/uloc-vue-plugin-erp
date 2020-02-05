const version = process.env.VERSION || require('../package.json').version

module.exports = {
  version,
  banner:
    '/*!\n' +
    ' * Auth Plugin v' + version + '\n' +
    ' * Uloc Framework\n' +
    ' * (c) 2018-present Tiago Felipe\n' +
    ' * Released under the MIT License.\n' +
    ' */\n'
}
