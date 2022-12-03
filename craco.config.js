const path = require('path')

const resolve = (pathname) => path.resolve(__dirname, pathname)

module.exports = {
  // webpack
  webpack: {
    alias: {
      '@': resolve('src')
    }
  }
}
