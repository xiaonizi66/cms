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
        target: 'http://39.98.190.128:8080/',
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        ws: true, // 是否代理websockets
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
