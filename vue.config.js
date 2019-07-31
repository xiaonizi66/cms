module.exports = {
  baseUrl: '/',
  outputDir: 'dist',
  productionSourceMap: true,
  lintOnSave: true,
  devServer: {
    // open: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://www.baidu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
