const
  host = process.env.HOST || '127.0.0.1',
  port = process.env.PORT || 8082

const uri = `http://${host}:${port}`

module.exports = {
  appVersion: require('../package.json').version,
  host,
  port,
  uri,
  displayURI: uri.replace(`//0.0.0.0:`, `//localhost:`),
  rtl: false,
  devServerConfig: {
    publicPath: '/',
    host,
    port,
    stats: 'none',
    hot: true,
    inline: true,
    overlay: true,
    quiet: true,
    historyApiFallback: true,
    noInfo: true,
    disableHostCheck: true,
    contentBase: [
      require('path').resolve(__dirname, '../dev')
    ]
  }
}
